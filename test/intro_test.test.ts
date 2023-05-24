
import {Builder,By,WebDriver} from 'selenium-webdriver'
import assert from 'assert'
import chrome from 'selenium-webdriver/chrome'

//describir las pruebas
jest.setTimeout(60000)

describe(
    'primer prueba selenium',
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
                await miNavegador.get('https:/www.selenium.dev/selenium/web/web-form.html')
                let titulo=await miNavegador.getTitle()
                assert.equal("Web form",titulo)
                //await miNavegador.sleep(10000)

                //hacer referencia a un elemento del dom
                let miElemento= await miNavegador.findElement(By.name('my-text'))
                await miElemento.sendKeys("Selenium")
                await miNavegador.sleep(5000)
                await miElemento.sendKeys("Anam")
                await miNavegador.sleep(5000)

                let miBoton= await miNavegador.findElement(By.css('button'))
                await miBoton.click()
                await miNavegador.sleep(2000)

                let miMensaje=await miNavegador.findElement(By.id('message'))
                let texto = await miMensaje.getText()                
                assert.equal(texto,"Received!")
                await miNavegador.sleep(2000)
            }
        )
    }
)