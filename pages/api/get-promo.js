import { GoogleSpreadsheet } from 'google-spreadsheet'


const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

export default async (request, response) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: process.env.SHEET_PRIVATE_KEY,
    })
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[2]
    await sheet.loadCells('A:B')

    const showPromotionCell = sheet.getCell(2, 0)
    const textCell = sheet.getCell(2, 1)

    response.end(JSON.stringify({
      showCoupon: showPromotionCell.value === 'VERDADEIRO',
      message: textCell.value
    }))

  } catch (error) {

    response.end(JSON.stringify({
      showCoupon: false,
      message: ''
    }))

  }

}