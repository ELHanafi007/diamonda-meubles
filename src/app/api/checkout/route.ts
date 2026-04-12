import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error("RESEND_API_KEY is missing");
    return NextResponse.json({ error: "Configuration error" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const body = await request.json();
    const { name, city, address, phone, items, totalPrice } = body;

    const itemsHtml = items.map((item: any) => `
      <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
        <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 120px; object-fit: cover; margin-bottom: 10px;" />
        <h3 style="margin: 0; font-family: serif;">${item.name}</h3>
        <p style="margin: 5px 0; color: #666;">Catégorie: ${item.category} | Matériau: ${item.material}</p>
        <p style="margin: 5px 0; font-weight: bold;">${item.price} MAD</p>
      </div>
    `).join('');

    const { data, error } = await resend.emails.send({
      from: 'Diamontaris Meubles <onboarding@resend.dev>',
      to: [process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'me.kaoukabi@gmail.com'],
      subject: `Nouvelle Commande - ${name} (${city})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #B8860B; font-family: serif; text-align: center;">DIAMONTARIS MEUBLES</h1>
          <p style="text-align: center; text-transform: uppercase; letter-spacing: 2px; font-size: 12px;">Demande de devis et livraison</p>
          
          <div style="background: #f9f9f9; padding: 30px; margin: 30px 0; border: 1px solid #eee;">
            <h2 style="font-size: 18px; margin-top: 0; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Informations Client</h2>
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Tél:</strong> ${phone}</p>
            <p><strong>Ville:</strong> ${city}</p>
            <p><strong>Adresse:</strong> ${address}</p>
          </div>

          <h2 style="font-size: 18px;">Détail de la sélection</h2>
          ${itemsHtml}

          <div style="margin-top: 30px; text-align: right; border-top: 2px solid #B8860B; padding-top: 20px;">
            <p style="font-size: 20px;"><strong>Total Estimé: ${totalPrice.toLocaleString()} MAD</strong></p>
          </div>

          <p style="font-size: 12px; color: #999; margin-top: 50px; text-align: center;">
            Ce message a été généré par la conciergerie Diamontaris Meubles Rabat.
          </p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
