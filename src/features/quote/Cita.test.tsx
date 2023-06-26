import { rest } from "msw";
import { setupServer } from "msw/node";
import {  act, fireEvent, screen, waitFor } from "@testing-library/react"
import { render } from "../../test-utils"
import Cita from "./Cita"
import  userEvent  from "@testing-library/user-event"

const url = "https://thesimpsonsquoteapi.glitch.me/quotes"

const data = [
    {
        quote: "I hope I didn't brain my damage.",
        character: "Homer Simpson",
        image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
        characterDirection: "Right"
    }
]

export const handlers = [
    rest.get(url, (req, res, ctx) => {
        return res(ctx.json(data), ctx.status(200));
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const renderComponent = () => render(<Cita />);


describe("Cita", ()=>{    
    describe("renderizado inicial", ()=>{  
        it("Se renderiza el texto No se encontro ninguna cita", ()=>{ 
            renderComponent()
            const text = screen.getByText("No se encontro ninguna cita")
            expect(text).toBeInTheDocument();
        })       
        it("Se renderiza el input: Ingresa el nombre del autor", ()=>{           
            renderComponent()
            const inputText = screen.getByPlaceholderText("Ingresa el nombre del autor")
            expect(inputText).toBeInTheDocument();
        })
        it("se renderiza el boton Obtener cita aleatoria", ()=>{
            renderComponent()
            const botonBuscar = screen.getByText(/obtener cita aleatoria/i)
            expect (botonBuscar).toBeInTheDocument()
        })
        it("se renderiza el boton Borrar", ()=>{           
            renderComponent()
            const botonBorrar = screen.getByText(/borrar/i)
            expect (botonBorrar).toBeInTheDocument()
        })
    })
    describe(("cambio de texto en boton obtener"), ()=>{       
        it("Ingresando un texto al input se muestra el texto Obtener Cita", async ()=>{           
            renderComponent()
            const inputText = await screen.findByPlaceholderText("Ingresa el nombre del autor")
            //screen.debug()
            await userEvent.clear(inputText);  
            fireEvent.change(inputText, { target: { value: 'homer' } });
            await waitFor(()=>{
                //screen.debug()
                expect (screen.queryByText(/obtener cita aleatoria/i)).not.toBeInTheDocument()
            })
        })
    })

   describe("Ingresando un valor numerico al input", () => {         
        it("se debe mostrar el mensaje Por favor ingrese un nombre válido", async () => {           
           renderComponent();
            const inputText = await screen.findByPlaceholderText('Ingresa el nombre del autor')
            fireEvent.change(inputText, { target: { value: '1' } })           
            const botonBuscar = screen.getByRole("button", {name:/obtener cita/i})
            userEvent.click(botonBuscar);
             await waitFor(()=>{
                expect(screen.getByText('Por favor ingrese un nombre válido')).toBeInTheDocument();
               
           })
            
        })      
    })

    describe("Boton borrar", ()=>{
        it("al presionar boton borrar se renderiza: No se encontro ninguna cita, en el input: Ingresa el nombre del autor y en el boton Obtener cita aleatoria", async () =>{
            renderComponent()
            const inputText = await screen.findByPlaceholderText(/Ingresa el nombre del autor/i)
            const botonBuscar = await screen.findByLabelText(/obtener cita aleatoria/i)
            await userEvent.clear(inputText);
            userEvent.type(inputText ,'Bart');
            userEvent.click(botonBuscar);
           // screen.debug()
            const botonBorrar = await screen.findByLabelText(/borrar/i)
            userEvent.click(botonBorrar);
           // screen.debug()
            await waitFor(() =>{
            expect ( screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument()
            })
        })
    })
    
    describe("Cuando la query se esta ejecutando", () => {
        it("Deberia mostrar el mensaje de cargando", async () => {
            renderComponent()
            const botonBuscar = await screen.findByLabelText(/obtener cita aleatoria/i)
            userEvent.click(botonBuscar);
            await waitFor(() =>{
                expect (screen.getByText(/cargando/i)).toBeInTheDocument()                
            })
        });
        
        it('Se renderiza cita al azar', async()=>{
            renderComponent()
            // const botonBuscar = await screen.findByLabelText(/obtener cita aleatoria/i)
            const botonBuscar = screen.getByRole("button", {name : /obtener cita aleatoria/i})
            userEvent.click(botonBuscar);
            await waitFor(() =>{
                screen.debug()
              expect(screen.getByText(/I hope I didn't brain my damage./i)).toBeInTheDocument();
            })
         })

         it('Se renderiza cita del personaje ingresado', async()=>{
            renderComponent()
            const inputText = await screen.findByPlaceholderText(/Ingresa el nombre del autor/i)
            const botonBuscar = await screen.findByLabelText(/obtener cita/i)            
            await userEvent.clear(inputText);
            await userEvent.type(inputText, "homer")            
            userEvent.click(botonBuscar);
            await waitFor(() =>{
            
              expect(screen.getByText(/I hope I didn't brain my damage./i)).toBeInTheDocument();
            })
         })

        
    })     
 

})