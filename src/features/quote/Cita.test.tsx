import {  getByRole, screen, waitFor } from "@testing-library/react"
import { render } from "../../test-utils"
import Cita from "./Cita"
import  userEvent  from "@testing-library/user-event"


describe("Cita", ()=>{
    describe("se renderiza", ()=>{
        it("input", ()=>{
            render(<Cita/>)
            const inputText = screen.getByPlaceholderText("Ingresa el nombre del autor")
            expect(inputText).toBeInTheDocument();
        })
    })
    describe(("texto en boton obtener"), ()=>{
        it("Cuando el input no tiene datos se muestra el texto Obtener cita aleatoria", ()=>{
            render(<Cita/>)
            const inputText = screen.getByPlaceholderText("Ingresa el nombre del autor")
            expect (screen.getByText(/obtener cita aleatoria/i)            
              ).toBeInTheDocument()
        })
        it("Ingresando in texto al input se muestra el texto Obtener Cita", ()=>{
            render(<Cita/>)
            const inputText = screen.getByPlaceholderText("Ingresa el nombre del autor")
            userEvent.type(inputText, "Bart Simpson");    
            expect (screen.getByText(/obtener cita/i)            
              ).toBeInTheDocument()
        })
    })

    describe(("renderizado de la cita"), ()=>{
        it("ingresando Bart Simpson al input se muestra una cita",async () => {          
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
    
    describe("Boton borrar", ()=>{
        it("al presionar boton borrar se renderiza No se encontro ninguna cita, en el input: Ingresa el nombre del autor y en el boton Obtener cita aleatoria", async() =>{
            render(<Cita/>)
           
            const botonBorrar = screen.getByRole('button', {name: /borrar/i})
            userEvent.click(botonBorrar);  
            expect (await screen.findByText(/No se encontro ninguna cita/i)            
              ).toBeInTheDocument()
            expect(screen.getByPlaceholderText(/ingresa el nombre del autor/i)).toBeInTheDocument()
            expect(screen.getByRole('button', {name: /obtener cita aleatoria/i})).toBeInTheDocument()
      
        })
    })

})