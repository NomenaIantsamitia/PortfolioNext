import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { opportunite, nom, email, organisation, message } = await req.json();

    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants.' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      // "from" doit être une adresse de ton domaine vérifié sur Resend
      // (ou onboarding@resend.dev pour tester avant de vérifier un domaine)
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['misedratiana@gmail.com'], // TA boîte mail
      replyTo: email, // <-- l'email du visiteur : cliquer "répondre" lui écrit directement
      subject: `Nouveau message (${opportunite}) de ${nom}`,
      html: `
        <h2>Nouveau message depuis le portfolio</h2>
        <p><strong>Type :</strong> ${opportunite}</p>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Organisation :</strong> ${organisation || 'Non renseignée'}</p>
        <p><strong>Message :</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { error: 'Erreur serveur.' },
      { status: 500 }
    );
  }
}