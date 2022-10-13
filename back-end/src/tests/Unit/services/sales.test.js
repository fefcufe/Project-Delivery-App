const sinon = require('sinon');
const { expect } = require('chai');
const Model = require('../../../database/models');
const saleService = require('../../../services/saleService');

describe('Ensure sales services is ok', () => {
  describe('return empty array when have no data in database', () => {
    const result = [{ id: '1', userId: '2', sellerId: '3', totalPrice: '4', deliveryAddress: 'rua', deliveryNumber:'5', saleDate:'11/11/1994', status:'pendind' }];

    beforeEach(() => {
      sinon.stub(Model.Sale, 'create').resolves(result);
    });

    afterEach(() => {
      sinon.restore();
    })

    it('return an array of object', async () => {
      const result = await saleService.createSale();
      expect(result).to.be.an('array');
    })

    describe('The object has properties', () => {
      it('the object in array has the following keys: user_id, seller_id, total_price, delivery_address, delivery_number, sale_date, status', async () => {
        const [result] = await saleService.createSale();
        expect(result).to.be.an.keys('id', 'userId', 'sellerId', 'totalPrice', 'deliveryAddress', 'deliveryNumber', 'saleDate', 'status');
      })
    })

    describe('return a list of all sales', () => {
      const mock = [{ id: '1', userId: '2', sellerId: '3', totalPrice: '4', deliveryAddress: 'rua', deliveryNumber:'5', saleDate:'11/11/1994', status:'pendind' }];

      beforeEach(() => {
        sinon.stub(Model.Sale, 'findAll').resolves(mock);
      });

      afterEach(() => {
        sinon.restore();
      })

      it('return an array of object', async () => {
        const result = await saleService.listSales();
        expect(result).to.be.equal(mock);
      })
    });
  })

  describe('return a list of all sales with user and products owneds', () => {
      const expectedMock = [{
      "id": 1,
      "userId": 3,
      "sellerId": 2,
      "totalPrice": "20.10",
      "deliveryAddress": "Rua trinta e dois",
      "deliveryNumber": "192",
      "saleDate": "2022-09-29T00:18:16.000Z",
      "status": "Pendente",
      "user": {
        "id": 3,
        "name": "Cliente Zé Birita",
        "email": "zebirita@email.com",
        "role": "customer"
      },
      "seller": {
        "id": 2,
        "name": "Fulana Pereira",
        "email": "fulana@deliveryapp.com",
        "role": "seller"
      },
      "products": [
        {
          "id": 3,
          "name": "Antarctica Pilsen 300ml",
          "price": "2.49",
          "urlImage": "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
          "SalesProducts": {
            "saleId": 1,
            "productId": 3,
            "quantity": 12
          }
        },
        {
          "id": 4,
          "name": "Brahma 600ml",
          "price": "7.50",
          "urlImage": "http://localhost:3001/images/brahma_600ml.jpg",
          "SalesProducts": {
            "saleId": 1,
            "productId": 4,
            "quantity": 14
          }
        }
      ]
    }]

    beforeEach(() => {
      sinon.stub(Model.Sale, 'findAll').resolves(expectedMock);
    });

    afterEach(() => {
      sinon.restore();
    })

    it('return an array of object with sale, user and products', async () => {
      const result = await saleService.listCompleteSale();
      expect(result).to.be.equal(expectedMock);
    })
  });

  describe('ensure its possible to update a sale', () => {
    const mock = { id: '1', userId: '2', sellerId: '3', totalPrice: '4', deliveryAddress: 'rua', deliveryNumber:'5', saleDate:'11/11/1994', status:'preparing' };
    const data = { status: 'preparing' };

    beforeEach(() => {
      sinon.stub(Model.Sale, 'update').resolves([mock]);
    });

    afterEach(() => {
      sinon.restore();
    })

    it('return an array of object', async () => {
      const result = await saleService.updateSale(1, data);
      expect(result).to.be.equal(mock);
    })
  });
})