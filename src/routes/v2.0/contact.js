var express = require('express');
var router = express.Router();
var ContactModel = require('./../../models/contact');

router.route('/contact')
    /**
     * @api {get} /v2.0/contact 2 - Listagem
     * @apiVersion 2.0.0
     * @apiName Listar contatos
     * @apiGroup Contato
     * 
     * @apiSuccess {String} _id Chave primária do contato.
     * @apiSuccess {String} name Nome do contato.
     * @apiSuccess {String} email E-mail do contato.
     * @apiSuccess {Boolean} is_active Status do contato.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     [
     *       {
     *         "_id": "CHAVE-PRIMARIA",
     *         "name": "João",
     *         "email": "joao@gmail.com",
     *         "is_active": true
     *       }
     *     ]
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */ 
    .get(function (req, res) {
        res.json({'ok':'maluco'});
    })
    /**
     * @api {post} /v2.0/contact 1 - Cadastro
     * @apiVersion 2.0.0
     * @apiName Cadastrar contato
     * @apiGroup Contato
     * 
     * @apiParam {String} name Nome do contato
     * @apiParam {String} email E-mail do contato
     * @apiParam {Boolean} is_active Status do contato
     * 
     * @apiParamExample {json} Request-Example:
     *     {
     *       "name": "João",
     *       "email": "joao@gmail.com",
     *       "is_active": true
     *     }
     *
     * @apiSuccess (201) {String} _id Chave primária do contato.
     * @apiSuccess (201) {String} name Nome do contato.
     * @apiSuccess (201) {String} email E-mail do contato.
     * @apiSuccess (201) {Boolean} is_active Status do contato.
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 201 OK
     *     {
     *       "_id": "CHAVE-PRIMARIA",
     *       "name": "João",
     *       "email": "joao@gmail.com",
     *       "is_active": true
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */ 
    .post(function (req, res) {
        var contact = new ContactModel(req.body);
        contact.save(function (err) {
            res.status(201).send(contact);
        });
    })
;

router.route('/contact/:id')
    /**
     * @api {put} /v2.0/contact/:id 3 - Atualização
     * @apiVersion 2.0.0
     * @apiName Atualizar contato
     * @apiGroup Contato
     *
     * @apiParam {String} id Chave primária do contato.
     *
     * @apiSuccess {String} _id Chave primária do contato.
     * @apiSuccess {String} nome Nome do contato.
     * @apiSuccess {String} email E-mail do contato.
     * @apiSuccess {Boolean} is_active Status do contato.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "_id": "CHAVE-PRIMARIA",
     *       "name": "João",
     *       "email": "joao@gmail.com",
     *       "is_active": true
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */ 
    .put(function (req, res) {
        ContactModel.findById(req.params.id, function (err, contact) {
            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.is_active = req.body.is_active;

            contact.save(function (err) {
                res.json(contact);
            });
        });
    })
    /**
     * @api {delete} /v2.0/contact/:id 4 - Exclusão
     * @apiVersion 2.0.0
     * @apiName Apagar contato
     * @apiGroup Contato
     *
     * @apiParam {String} id Chave primária do contato.
     *
     * @apiSuccess {String} _id Chave primária do contato.
     * @apiSuccess {String} nome Nome do contato.
     * @apiSuccess {String} email E-mail do contato.
     * @apiSuccess {Boolean} is_active Status do contato.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "_id": "CHAVE-PRIMARIA",
     *       "name": "João",
     *       "email": "joao@gmail.com",
     *       "is_active": true
     *     }
     *
     * @apiError UserNotFound The id of the User was not found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     */ 
    .delete(function (req, res) {
        ContactModel.remove({ '_id': req.params.id }, function (err, contact) {
            res.json(contact);
        });
    })
;

module.exports = router;