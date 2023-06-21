import {  getByRole, screen, waitFor } from "@testing-library/react"
import { render } from "../../test-utils"
import Cita from "./Cita"
import  userEvent  from "@testing-library/user-event"
import {Boton}  from "./styled"



describe("Cita", ()=>{
    describe("se renderiza", ()=>{
       it("Se renderiza el texto inicial", ()=>{
            render(<Cita/>)
            const text = screen.getByText("No se encontro ninguna cita")
            expect(text).toBeInTheDocument();
        })       
        it("input", ()=>{
            render(<Cita/>)
            const inputText = screen.getByPlaceholderText("Ingresa el nombre del autor")
            expect(inputText).toBeInTheDocument();
        })
        it("boton Obtener cita aleatoria", ()=>{
            render(<Cita/>)
            const botonBuscar = screen.getByText(/obtener cita aleatoria/i)
            expect (botonBuscar).toBeInTheDocument()
        })
        it("boton Borrar", ()=>{
            render(<Cita/>)
            const botonBorrar = screen.getByText(/borrar/i)
            expect (botonBorrar).toBeInTheDocument()
        })
    })
    describe(("texto en boton obtener"), ()=>{       
        it("Ingresando un texto al input se muestra el texto Obtener Cita", ()=>{
            render(<Cita/>)
            const inputText = screen.getByPlaceholderText("Ingresa el nombre del autor")
            userEvent.type(inputText, "Bart Simpson");    
            expect (screen.getByText(/obtener cita/i)            
              ).toBeInTheDocument()
        })
    })

    describe("Boton borrar", ()=>{
        it("al presionar boton borrar se renderiza: No se encontro ninguna cita, en el input: Ingresa el nombre del autor y en el boton Obtener cita aleatoria", () =>{
            render(<Cita/>)           
            const botonBorrar = screen.getByRole('button', {name: /borrar/i})
            userEvent.click(botonBorrar);  
            expect ( screen.getByText(/No se encontro ninguna cita/i)            
              ).toBeInTheDocument()
            expect(screen.getByPlaceholderText(/ingresa el nombre del autor/i)).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /obtener cita aleatoria/i})).toBeInTheDocument()
        })
    })

    /*describe("funcionalidad del boton obtener",()=>{
        it("al hacer click en buscar se ejecuta una funcion", ()=>{
            const mockFecth = jest.fn()
            render(<Cita />)
            const botonObtener = screen.getByRole('button', {name: /obtener cita aleatoria/i})
            userEvent.click(botonObtener)
            expect(mockFecth).toBeCalled()
        })
    } )*/

    describe(("renderizado de la cita"), ()=>{
        it("al hacer click en buscar se muestra el texto: Cargando...",async () => {          
            render(<Cita/>)
            const inputText = screen.getByPlaceholderText("Ingresa el nombre del autor")
            userEvent.type(inputText, "Bart Simpson");  
            userEvent.click(screen.getByRole('button', {name:/obtener cita/i}))  
            expect (await screen.findByText(/cargando/i)            
              ).toBeInTheDocument()
        })
        it("Ingresando un valor numerico al input se muestra: Por favor ingrese un nombre válido", async () =>{
            render(<Cita/>)
            const inputText = screen.getByPlaceholderText("Ingresa el nombre del autor")
            userEvent.type(inputText, "5");  
            userEvent.click(screen.getByRole('button', {name:/obtener cita/i}))  
            expect (await screen.findByText(/Por favor ingrese un nombre válido/i)            
              ).toBeInTheDocument()
        })        
    })
    
   

})