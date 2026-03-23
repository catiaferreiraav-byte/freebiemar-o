export async function onRequestPost(context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  try {
    const { name, email } = await context.request.json();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: 'Nome e email são obrigatórios.' }),
        { status: 400, headers }
      );
    }

    const MAILERLITE_API_KEY = context.env.MAILERLITE_API_KEY;
    const MAILERLITE_GROUP_ID = context.env.MAILERLITE_GROUP_ID;

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        fields: { name },
        groups: [MAILERLITE_GROUP_ID],
      }),
    });

    if (response.ok || response.status === 409) {
      return new Response(JSON.stringify({ success: true }), { status: 200, headers });
    }

    const err = await response.json();
    console.error('MailerLite error:', err);
    return new Response(
      JSON.stringify({ error: 'Erro ao registar. Tenta novamente.' }),
      { status: 500, headers }
    );

  } catch (err) {
    console.error('Worker error:', err);
    return new Response(
      JSON.stringify({ error: 'Erro interno. Tenta novamente.' }),
      { status: 500, headers }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
