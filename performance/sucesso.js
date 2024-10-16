import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {

    test("Deve retornar erro 500", () => {
        const url = 'http://localhost:8080/api/cars';  // URL da sua API simulada no Wiremock
        
        const payload = JSON.stringify({
            brand: 'Volkswagen',
            model: 'fusca',
            year: 1965,                            
        });

        const params = {
            headers: {  
                'Content-Type': 'application/json', 
            },                              
        }

        const response = http.post(url, payload, params);

        // Verifica se o status da resposta é 201 e se a mensagem de erro está correta
        check(response, {
            'status is 201': (r) => r.status === 201,
            "message is correct": (r) => r.json('message') === "Car successfully registered!",
            "carId is 6": (r) => r.json('carId') === 6,
        });
    })
        sleep(1);

}

function test(name, fun) {
    console.log(`Running test: ${name}`);
    fun();
}