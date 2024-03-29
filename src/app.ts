import { MemoryDB, addAnswer, addKeyword, createBot, createFlow, createProvider } from "@bot-whatsapp/bot";
import{BaileysProvider, handleCtx} from '@bot-whatsapp/provider-baileys'

const flowBienvenida= addKeyword('Hola') .addAnswer('¡Gracias por comunicarte con Sanatoria!')


const main= async()=>{
    const provider =createProvider(BaileysProvider)
    provider.initHttpServer(3002)

    provider.http?.server.post('/send-message',handleCtx(async(bot,req,res)=>{
       const body=req.body
       const message=body.message
       const mediaUrl=body.mediaUrl
       await bot.sendMessage('9511770273',message,{
        media:mediaUrl
       })
        res.end('esto es del server polka')
    }))
    await createBot({
        flow:createFlow([flowBienvenida]),
        database:new MemoryDB(),
        provider
    })
}
main()