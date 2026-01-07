import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const { to, events } = await request.json()

    if (!to || !events) {
      return NextResponse.json(
        { error: 'E-mail e eventos são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se a chave da API está configurada
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY não configurada')
      return NextResponse.json(
        { 
          success: false, 
          error: 'Serviço de e-mail não configurado. Configure a variável RESEND_API_KEY.' 
        },
        { status: 500 }
      )
    }

    // Inicializar Resend com a chave da API (após verificação)
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Criar HTML do e-mail com os eventos
    const eventsHTML = events.map((event: any) => `
      <div style="background: #f3f4f6; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #3b82f6;">
        <h3 style="margin: 0 0 10px 0; color: #1f2937;">${event.title}</h3>
        <p style="margin: 5px 0; color: #6b7280;"><strong>Data:</strong> ${event.date}</p>
        <p style="margin: 5px 0; color: #6b7280;"><strong>Horário:</strong> ${event.time}</p>
        <p style="margin: 5px 0; color: #6b7280;"><strong>Local:</strong> ${event.location}</p>
        <p style="margin: 5px 0; color: #6b7280;"><strong>Descrição:</strong> ${event.description}</p>
      </div>
    `).join('')

    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Calendário Compartilhado</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0;">📅 Calendário Compartilhado</h1>
            <p style="color: white; margin: 10px 0 0 0;">Você recebeu um calendário com eventos importantes!</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 10px;">
            <h2 style="color: #1f2937; margin-top: 0;">Eventos Agendados:</h2>
            ${eventsHTML}
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 10px;">
            <p style="color: #6b7280; margin: 0;">Este calendário foi compartilhado com você através do app Baby Care</p>
          </div>
        </body>
      </html>
    `

    // Enviar e-mail usando Resend
    const { data, error } = await resend.emails.send({
      from: 'Baby Care <onboarding@resend.dev>',
      to: [to],
      subject: '📅 Calendário Compartilhado - Baby Care',
      html: emailHTML,
    })

    if (error) {
      console.error('Erro ao enviar e-mail via Resend:', error)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Erro ao enviar e-mail. Verifique as configurações.' 
        },
        { status: 500 }
      )
    }

    console.log('E-mail enviado com sucesso para:', to)
    console.log('ID do e-mail:', data?.id)

    return NextResponse.json({ 
      success: true, 
      message: 'E-mail enviado com sucesso!',
      emailId: data?.id
    })

  } catch (error) {
    console.error('Erro ao processar requisição:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao enviar e-mail' 
      },
      { status: 500 }
    )
  }
}
