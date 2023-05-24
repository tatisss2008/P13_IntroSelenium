
import {Builder,By, Key,WebDriver} from 'selenium-webdriver'
import assert from 'assert'
import chrome from 'selenium-webdriver/chrome'

//describir las pruebas
jest.setTimeout(60000)

describe(
    'Prueba Atenea',
    ()=>{
        //definir objeto de la clase webdriver
        let miNavegador:WebDriver

        //beforeAll
        beforeAll(
            async ()=>{
                miNavegador= await new Builder().forBrowser('chrome').build()
            }
        )
        //afterAll
        afterAll(
            async ()=>{
                await miNavegador.quit()
            }
        )

        //Crear las pruebas
        test(
            'Prueba de ejemplo con Selenium',
            async ()=>{                
                await miNavegador.get('https://agenciaatenea.gov.co/')
                let titulo=await miNavegador.getTitle()
                assert.match(titulo,/Atenea/i)
                await miNavegador.sleep(2000)

                //conectarme a una API y obtener una palabra
                let respuesta= await fetch('https://random-word-api.herokuapp.com/word?number=1')
                let palabra = await respuesta.json()

                for (let i=0; i<=3; i++){
                    let miBusqueda=await miNavegador.findElement(By.id('edit-keys'))
                    //await miBusqueda.sendKeys("ejemplo",Key.RETURN)
                    await miBusqueda.sendKeys(palabra[i],Key.RETURN)
                    await miNavegador.sleep(2000)
                }
            }
        )

    }
)