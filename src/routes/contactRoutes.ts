import { Request, Response, NextFunction, Application } from "express";
import { ContactController } from "../controllers/contactController";

export class ContactRoutes {

    static addRoutes(app: Application) {
        const controller = new ContactController()

        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        // Contact 
        app.route('/contact')
            .get((req: Request, res: Response, next: NextFunction) => {
                if (req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e') {
                    res.status(401).send('You shall not pass!');
                } else {
                    next();
                }
            }, controller.getContacts)
            .post(controller.addNewContact);

        // Contact detail
        app.route('/contact/:contactId')
            .get(controller.getContactById)
            .put(controller.updateContact)
            .delete(controller.deleteContact)

    }
}