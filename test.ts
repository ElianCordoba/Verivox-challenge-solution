const request = require('supertest');
const application = require('./dist/app').default;
application.listen(3000);

const endpoint = '/consumption?yearlyConsumption=';

describe('Enpoint tests', () => {
  test('It should respond Product B is cheaper with a 3500 kWh/year consumption', async () => {
    const response = await request(application).get(endpoint + 3500);
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toEqual({
      result:
        [
          { name: 'Packaged tariff', amount: 800 },
          { name: 'Basic electricity tariff', amount: 830 }
        ]
    });
  });

  test('It should respond Product B is cheaper with a 4500 kWh/year consumption', async () => {
    const response = await request(application).get(endpoint + 4500);
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toEqual({
      result: [
        { name: 'Packaged tariff', amount: 950 },
        { name: 'Basic electricity tariff', amount: 1050 }
      ]
    });
  });

  test('It should respond Product A is cheaper with a 6000 kWh/year consumption', async () => {
    const response = await request(application).get(endpoint + 6000);
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toEqual({
      result: [
        { name: 'Basic electricity tariff', amount: 1380 },
        { name: 'Packaged tariff', amount: 1400 }
      ]
    });
  });

  test('It should get the truth', async () => {
    const response = await request(application).get('/');
    expect(response.status).toBe(418);
    expect(JSON.parse(response.text)).toEqual('Elian === Cool dev');
  });
});
