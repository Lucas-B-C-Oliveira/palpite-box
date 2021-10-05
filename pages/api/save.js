import { GoogleSpreadsheet } from 'google-spreadsheet'
import moment from 'moment'


const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

const genCoupon = () => {

  const code = parseInt(moment().format('YYMMDDHHmmssSS')).toString(16).toUpperCase()
  return code.substr(0, 4) + '-' + code.substr(4, 4) + '-' + code.substr(8, 4)

}

export default async (request, response) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: process.env.SHEET_PRIVATE_KEY,
    })
    await doc.loadInfo()
    const sheet = doc.sheetsByIndex[1]
    const data = JSON.parse(request.body)

    const sheetConfig = doc.sheetsByIndex[2]
    await sheetConfig.loadCells('A:B')

    const showPromotionCell = sheetConfig.getCell(2, 0)
    const textCell = sheetConfig.getCell(2, 1)

    let Cupom = ''
    let Promo = ''

    if (showPromotionCell.value === 'VERDADEIRO') {
      Cupom = genCoupon()
      Promo = textCell.value
    }

    //Nome	Email	WhatsApp	Cupom	Promo
    await sheet.addRow({
      Nome: data.Nome,
      Email: data.Email,
      WhatsApp: data.WhatsApp,
      Nota: parseInt(data.Nota),
      'Data Preenchimento': moment().format('DD/MM/YYYY HH:mm:ss'),
      Cupom,
      Promo
    })

    response.end(JSON.stringify({
      showCoupon: Cupom !== '',
      Cupom,
      Promo
    }))

  } catch (error) {
    red.end('error')
  }

}