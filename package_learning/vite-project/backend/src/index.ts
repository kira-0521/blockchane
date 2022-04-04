import express, { Request, Response, NextFunction} from 'express'
import cors from 'cors'
import helmet from 'helmet'
import session from 'express-session'

const initializeServer = async () => {
    const app = express()
    const PORT = 3000

    // json返却
    app.use(express.json())

    // urlをエンコード
    app.use(express.urlencoded({ extended: true }))

    // cors対策
    app.use(cors())

    // セキュリティヘッダー対策
    app.use(helmet())

    app.get('/', (req: Request, res: Response) => {
        return res.status(200).send({
            message: 'get request successful'
        })
    })

    app.listen(PORT, () => {
        console.log(`dev server running at: http://localhost:${PORT}/`)
    })
}

(async() => {
   await initializeServer()
})();

