import app from '../index';
import supertest from 'supertest';
import resize from '../utilties/ResizingFunction';
import path from 'path';

const request = supertest(app);

describe('Testing the app endpoints:', () => {
  it('Gets api/images endpoint', async () => {
    const respones = await request.get('/api/images');
    expect(respones.status).toBe(200);
  });
});

describe('Testing the image resizing and image endpoints:', () => {
  const fileName = 'fjord' as string;
  const imgLocation = path.resolve('./', `public/images/${fileName}.jpg`);
  const width = '200';
  const height = '200';
  it('should not throw an error', () => {
    expect(resize(imgLocation, width, height, fileName)).not.toThrowError;
  });

  it('Gets api/images resizing endpoint', async () => {
    const respones = await request.get(
      '/api/images?filename=fjord&width=800&height=100'
    );
    expect(respones.status).toBe(200);
  });
});
