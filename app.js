const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MongoAdapter = require('@bot-whatsapp/database/mongo')

/**
 * Declaramos las conexiones de Mongo
 */

const MONGO_DB_URI = 'mongodb+srv://marcos:1804i97z@gricluster.oyauxgr.mongodb.net/?retryWrites=true&w=majority&appName=GriCluster'
const MONGO_DB_NAME = 'grichatbotdb'
const adapterDB = new MongoAdapter({ dbUri: MONGO_DB_URI, dbName: MONGO_DB_NAME })

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */


/* Crear flujo de ayuda
const flowAyuda = addKeyword(['ayuda'])
  .addAction(async (_, { flowDynamic }) => {
    return flowDynamic('¡Estoy aquí para ayudarte! ¿Necesitas ayuda con alguno de los siguientes temas?:\n 1. Información de producto.\n 2. Soporte técnico.\n 3. Otras consultas.');
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic }) => {
    const opcion = parseInt(ctx.body);
    switch (opcion) {
      case 1: return flowDynamic('Especifica qué producto te interesa.');
      case 2: return flowDynamic('Describe el problema que tienes.');
      case 3: return flowDynamic('Proporciona más detalles sobre tu consulta.');
    }
  });

// Crear flujo de otras consultas
const flowOtrasConsultas = addKeyword(['consultas'])
    .addAction(async (_, { flowDynamic }) => {
        return flowDynamic('Por favor, proporciona más detalles sobre tu consulta.');
    });

// Crear flujo de soporte técnico
const flowSoporteTecnico = addKeyword(['soporte'])
  .addAction(async (_, { flowDynamic }) => {
    return flowDynamic('Por favor, describe el problema que estás experimentando.');
  });

// Crear flujo de consulta de producto
const flowConsultaProducto = addKeyword(['producto'])
  .addAction(async (_, { flowDynamic }) => {
    return flowDynamic('Por favor, especifica qué producto te interesa.');
  });

const flowString = addKeyword('ver categorias')
    .addAnswer('Estas son las categorías disponibles:', null, async (ctx, {flowDynamic}) => {
        const categories = await db.getCategories()
        const messages = categories.map((c) => ({body: c.name}))
        await flowDynamic(messages)
    })

// Crear flujo principal
const flowPrincipal = addKeyword(['hola', 'alo'])
  .addAction(async (_, { flowDynamic }) => {
    return flowDynamic('¡Hola! ¿En qué puedo ayudarte?');
  });*/

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAction(async (_, { flowDynamic }) => {
      const response = await adapterDB.getConversationResponse("saludo")
      console.log(response)
      await flowDynamic(response)
    })

const main = async () => {
    
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
