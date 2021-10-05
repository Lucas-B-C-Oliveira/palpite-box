import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'

const Survey = () => {

  const [form, setForm] = useState({
    Nome: '',
    Email: '',
    WhatsApp: '',
    Nota: 0
  })

  const notas = [0, 1, 2, 3, 4, 5]
  const [sucess, setSucess] = useState(false)
  const [response, setResponse] = useState({})
  const [errorData, setErrorData] = useState({
    showMessageError: false,
    errors: {
      whatsAppError: false,
      emailError: false
    },
    whatsApp: {
      messageError: "",
      whatsAppTip: ""
    },
    email: {
      messageError: "",
      emailTip: ""
    },
    showEmptyMessage: false,
    results: {
      emptyName: true,
      emptyNameMessage: "O campo Nome está vazio",
      emptyWhatsApp: true,
      emptyWhatsAppMessage: "O campo WhatsApp está vazio",
      emptyEmail: true,
      emptyEmailMessage: "O campo Email está vazio",
      emptyNota: true,
      emptyNotaMessage: "O campo Nota está vazio",
    }
  })

  const save = async () => {

    let canSave = true


    if (errorData.results.emptyName || errorData.results.emptyWhatsApp || errorData.results.emptyEmail || errorData.results.emptyNota) {
      setErrorData({
        ...errorData,
        showEmptyMessage: true
      })

      canSave = false
    }

    if (errorData.errors.whatsAppError || errorData.errors.emailError) {
      setErrorData({
        ...errorData,
        showMessageError: true
      })

      canSave = false
    }
    else if (!errorData.results.emptyName && !errorData.results.emptyWhatsApp && !errorData.results.emptyEmail && !errorData.results.emptyNota) {
      setErrorData({
        ...errorData,
        showMessageError: false,
        showEmptyMessage: false
      })
    }

    if (!canSave) {
      return
    }

    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(form)
      })

      const data = await response.json()
      setSucess(true)
      setResponse(data)

    } catch (error) {

    }
  }

  const onChange = event => {
    const value = event.target.value
    const key = event.target.name

    checkData(key, value)

    setForm(old => ({
      ...old,
      [key]: value
    }))
  }

  const checkData = (name, value) => {

    let whatsAppResult = {}
    let emailResult = {}
    let nameResult = {}
    let notaResult = {}

    if (name === "WhatsApp") {
      let whatsAppErrorCharacters = ""
      let whatsAppErrorNumber = ""
      let whatsApp = {
        messageError: "",
        whatsAppTip: ""
      }
      const defaultWhatsAppMessageError = "Seu WhatsApp não é um número válido, pois: "
      const whatsAppTip = "Seu número de WhatsApp deve conter exatamente 11 números inteiros e nada diferente disso!"

      if (value.length === 0) {

        whatsAppResult = {
          errors: {
            ...errorData.errors,
            whatsAppError: false
          },
          whatsApp,
          results: {
            ...errorData.results,
            emptyWhatsApp: true
          }
        }

      }
      else {
        if (value.length > 11) {
          whatsAppErrorCharacters = "Possui mais de 11 caracteres, o certo é ter exatamente 11. "
        }
        else if (value.length < 11) {
          whatsAppErrorCharacters = "Possui menos de 11 caracteres, o certo é ter exatamente 11. "
        }

        if (Number.isNaN(parseInt(value))) {
          whatsAppErrorNumber = "Não é composto de apenas números inteiros. "
        }

        whatsApp = (whatsAppErrorCharacters + whatsAppErrorNumber) === ("" + "") ? {} : {
          messageError: defaultWhatsAppMessageError + whatsAppErrorCharacters + whatsAppErrorNumber,
          whatsAppTip
        }

        whatsAppResult = {
          errors: {
            ...errorData.errors,
            whatsAppError: (whatsAppErrorCharacters + whatsAppErrorNumber) !== "" + ""
          },
          whatsApp,
          results: {
            ...errorData.results,
            emptyWhatsApp: false
          }
        }
      }
    }

    if (name === "Email") {
      let email = {
        messageError: "",
        emailTip: ""
      }
      const messageError = "Esse email é inválido!"
      const emailTip = "Tente seguir o padrão de email: exemplo@exemplo.com"

      if (value.length === 0) {

        emailResult = {
          errors: {
            ...errorData.errors,
            emailError: false
          },
          email,
          results: {
            ...errorData.results,
            emptyEmail: true
          }
        }

      }
      else {

        var re = /\S+@\S+\.\S+/;
        const emailChecked = re.test(value);

        email = emailChecked ? { messageError: "", emailTip: "" } : { messageError, emailTip }

        emailResult = {
          errors: {
            ...errorData.errors,
            emailError: !emailChecked
          },
          email,
          results: {
            ...errorData.results,
            emptyEmail: false
          }
        }

      }

    }

    if (name === 'Nota') {

      if (value.length === 0) {
        notaResult = {
          results: {
            ...errorData.results,
            emptyNota: true
          }
        }
      }
      else {
        notaResult = {
          results: {
            ...errorData.results,
            emptyNota: false
          }
        }
      }

    }

    if (name === 'Nome') {

      if (value.length === 0) {
        nameResult = {
          results: {
            ...errorData.results,
            emptyName: true
          }
        }
      }
      else {
        nameResult = {
          results: {
            ...errorData.results,
            emptyName: false
          }
        }
      }

    }


    setErrorData({
      ...errorData,
      ...whatsAppResult,
      ...emailResult,
      ...nameResult,
      ...notaResult
    })



  }

  return (
    <div>
      <PageTitle title='Pesquisa' />

      <h1 className='text-center font-bold text-2xl'>Críticas e sugestões</h1>

      <p className='mb-10 text-center'>
        O restaurante x sempre busca por atender melhor seus clientes.<br />
        Por isso, estamos sempre abertos a ouvir sua opinião
      </p>

      {!sucess && <div className='w-1/5 mx-auto items-center text-center'>

        {/*//?| [LABEL] Seu nome */}
        <label className='font-bold'>Seu Nome:</label>
        <br />
        <input type='text' className='p-4 shadow bg-blue-100 my-2 mb-5 rounded' placeholder='Nome' onChange={onChange} name='Nome' value={form.Nome} />
        <br />

        {/*//?| [LABEL] Email Empty Message */}
        {errorData.showEmptyMessage && errorData.results.emptyName &&
          <p className='text-base font-normal text-center bg-red-100 border-t border-b border-red-500 text-red-700 bg-auto py-1 mb-10 '>{errorData.results.emptyNameMessage}
          </p>
        }

        {/*//?| [LABEL] E-mail */}
        <label className='font-bold'>E-mail:</label>
        <br />
        <input type='text' className='p-4 shadow bg-blue-100 my-2 mb-5 rounded' placeholder='Email' onChange={onChange} name='Email' value={form.Email} />
        <br />

        {/*//?| [LABEL] Email Empty Message */}
        {errorData.showEmptyMessage && errorData.results.emptyEmail &&
          <p className='text-base font-normal text-center bg-red-100 border-t border-b border-red-500 text-red-700 bg-auto py-1 mb-10 '>{errorData.results.emptyEmailMessage}
          </p>
        }

        {/*//?| [LABEL] Show Email Tip Message */}
        {errorData.errors.emailError &&
          <p className='text-base font-normal text-center bg-red-100 border-t border-b border-red-500 text-red-700 bg-auto py-1 mb-10 '>{errorData.email.emailTip}
          </p>
        }

        {/*//?| [LABEL] WhatsApp */}
        <label className='font-bold'>WhatsApp:</label>
        <br />
        <input type='text' className='p-4 shadow bg-blue-100 my-2 mb-5 rounded' placeholder='WhatsApp' onChange={onChange} name='WhatsApp' value={form.WhatsApp} />
        <br />

        {/*//?| [LABEL] WhatsApp Empty Message */}
        {errorData.showEmptyMessage && errorData.results.emptyWhatsApp &&
          <p className='text-base font-normal text-center bg-red-100 border-t border-b border-red-500 text-red-700 bg-auto py-1 mb-10 '>{errorData.results.emptyWhatsAppMessage}
          </p>
        }

        {/*//?| [LABEL] Show WhatsApp Tip Message */}
        {errorData.errors.whatsAppError &&
          <p className='text-base font-normal text-center bg-red-100 border-t border-b border-red-500 text-red-700 bg-auto py-1 mb-10 '>{errorData.whatsApp.whatsAppTip}
          </p>
        }

        {/*//?| [LABEL] Nota */}
        <label className='font-bold'>Nota:</label>

        {!errorData.showEmptyMessage && <div className='flex my-2 mb-10'>
          {notas.map(nota => {
            return (
              <label className='block w-1/6 text-center font-bold'>
                <input type='radio' name='Nota' value={nota} onChange={onChange} />
                <br />
                {nota}
              </label>)
          })}
        </div>}

        {errorData.showEmptyMessage && <div className='flex my-2'>
          {notas.map(nota => {
            return (
              <label className='block w-1/6 text-center font-bold'>
                <input type='radio' name='Nota' value={nota} onChange={onChange} />
                <br />
                {nota}
              </label>)
          })}
        </div>}

        {/*//?| [LABEL] Nota Empty Message */}
        {errorData.showEmptyMessage && errorData.results.emptyNota &&
          <p className='text-base font-normal text-center bg-red-100 border-t border-b border-red-500 text-red-700 bg-auto py-1 mb-10 '>{errorData.results.emptyNotaMessage}
          </p>
        }

        <button className='bg-blue-400 px-12 py-4 font-medium rounded-lg shadow-lg hover:shadow mb-7' onClick={save}>Salvar</button>

        {/*//?| [LABEL] Show Email Error Message */}
        {errorData.showMessageError && errorData.errors.emailError &&
          <p className=' text-sm font-normal mb-6 text-center bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3'>
            {errorData.email.messageError}
          </p>
        }

        {/*//?| [LABEL] Show WhatsApp Error Message */}
        {errorData.showMessageError && errorData.errors.whatsAppError &&
          <p className=' text-sm font-normal mb-6 text-center bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3'>
            {errorData.whatsApp.messageError}
          </p>
        }

      </div>

      }

      {sucess &&
        <div className='w-1/5 mx-auto'>
          <p className=' font-medium mb-6 text-center bg-green-100 border-t border-b border-green-500 text-green-700 px-4 py-3'>Obrigado por contribuir com sua crítica ou sugestão!!!</p>
          {
            response.showCoupon && <div className='text-center border p-4 mb-4'>
              Seu Cupom<br />
              <span className='font-bold text-2xl'>{response.Cupom}</span>
            </div>
          }
          {
            response.showCoupon && <div className='text-center border p-4 mb-4'>
              <span className='font-bold block mb-2'>{response.Promo}</span>
              <br />
              <span className='italic'>Tire um print ou foto desta tela e apresente ao garcom.</span>
            </div>
          }
        </div>
      }

    </div>
  )
}

export default Survey
