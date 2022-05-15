import app from '../index';
import supertest from 'supertest';

const request = supertest(app);


describe('Testing the app endpoints:', () => {
    it('Gets api/images endpoint' , async () => {         
    const respones = await request.get('/api/images')
    expect(respones.status).toBe(200);

    })
})


describe('Testing the image endpoints:', () => {
    it('Gets api/images endpoint' , async () => {  
        const fileName  = 'fjord';
        const width = 100;
        const height = 200;    
    const respones = await request.get(`/api/images?${fileName}=&width=${width}&height=${height}`)
    expect(respones.status).toBe(200);
    })
})

