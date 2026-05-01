const request = require('supertest')
const app = require('../app')
const Author = require('../models/Author')
const Book = require('../models/Book')
const dbHelper = require('../utils/helpers/db')

describe('Books API', () => {
    const booksRoot = '/api/v1/books'

    beforeAll(async () => await dbHelper.connect())
    afterEach(async () => await dbHelper.clear())
    afterAll(async () => await dbHelper.disconnect())

    describe(`POST ${booksRoot}`, () => {
        it('should create a new book and return 201', async () => {
            // Prepare: first make an author
            const author = await Author.create({
                name: 'Test Forefatter',
                email: 'hej@test.com'
            })

            expect(author._id).toBeDefined()

            // Act: run the HTTP call
            const res = await request(app).post(`${booksRoot}`).send({
                title: 'Test Book',
                author: author._id,
                genre: 'fiction',
                publishYear: 2026
            })

            // Verify: correct status code and response are returned
            expect(res.status).toBe(201)
            expect(res.body.title).toBe('Test Book')
            expect(res.body._id).toBeDefined()
        })

        it('should return 400 if mandatory fields are missing', async () => {
            const res = await request(app).post(`${booksRoot}`).send({})

            expect(res.status).toBe(400)
        })
    })

    describe(`GET ${booksRoot}/:id`, () => {
        it('should fetch existing book and return 200', async () => {
            const author = Author.create({
                name: 'Test Forefatter',
                email: 'hej@test.com'
            })

            expect(author._id).toBeDefined()

            const book = await Book.create({
                title: 'Test Book',
                author: author._id,
                genre: 'fiction',
                publishYear: 2026
             })

             const res = await request(app).get(`${booksRoot}/${book._id}`)

             expect(res.status).toBe(200)
             expect(res.body.title).toBe('Test Book')
        })

        it('should return 404 if id is invalid', async () => {
            const fakeId = '507f1f77bcf86cd799439011'
            const res = await request(app).get(`${booksRoot}/${fakeId}`)

            expect(res.status).toBe(404)
        })

        it('should return 404 if id is in wrong format', async () => {
            const res = await request(app).get(`${booksRoot}/bananorama`)

            expect(res.status).toBe(404)
        })
    })

    describe(`DELETE ${booksRoot}/:id`, () => {
        it('should delete the book and return 204', async () => {
            const author = Author.create({
                name: 'Test Forefatter',
                email: 'hej@test.com'
            })

            expect(author._id).toBeDefined()

            const book = await Book.create({
                title: 'Test Book',
                author: author._id,
                genre: 'fiction',
                publishYear: 2026
             })

            expect(book._id).toBeDefined()

            const res = await request(app).delete(`${booksRoot}/${book._id}`)

            expect(res.status).toBe(204)

            // Verify the book is gone
            const check = await Book.findById(book._id)
            expect(check).toBeNull()
        })
    })
})

