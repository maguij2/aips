const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

const middlewares = require('../middlewares');

const asyncMiddleware = middlewares.async;
const validate = middlewares.validate;

const validator = {};

const { User, Group } = require('../../db/models');

module.exports = (nextApp) => {

    /**
     * GET groups page
     */
    router.get('/page/:num(\\d+)', asyncMiddleware(async(req, res) => {
        const num = Number(req.params.num);
        if (num <= 0) {
            return res.status(404).send({ error: 'page not found' });
        }

        let groups = [];
        let groupCount = 1;
        const limit = 8;
        const offset = (num - 1) * limit;
        await Group.findAndCountAll({
            offset,
            limit,
        }).then((result) => {
            groups = result.rows;
            groupCount = result.count;
        });

        res.json({ groups, totalPages: Math.ceil(groupCount/limit) });
    }));

    /**
     * GET all user's groups
     */
    router.get('/', asyncMiddleware(async(req, res) => {
        const id = req.session.user ? req.session.user.id : 0;
        
        if (id === 0) {
            return res.json({ groups: [] });
        }

        const user = await User.findByPk(id);
        const groups = await user.getGroups();
        
        return res.json({ groups });
    }));

    /**
     * GET group page by id /group/${id}
     */
    router.get('/:id(\\d+)', asyncMiddleware(async(req, res) => {
        const userId = req.session.user ? req.session.user.id : 0;
        const id = req.params.id;
        
        const user = await User.findByPk(userId);
        const group = await Group.findByPk(id);

        nextApp.render(req, res, '/group/show', {
            user: user,
            group: group,
        });
    }));

    validator.create = [
        body('name').not().isEmpty().trim(),
        body('groupEmail').isEmail(),
        body('description').trim()
    ];

    /**
     * creates group
     */
    router.post('/create', validator.create, validate, asyncMiddleware(async(req, res) => {
        const { name, groupEmail, description } = req.body;
        const userId = req.session.user ? req.session.user.id : 0;
        const user = await User.findByPk(userId);
        if (!user) {
            // return res.redirect('/login');
            // TODO redirect to login page
            return res.status(404).send({ error: 'user not found' })
        }

        const group = await Group.create({ name, adminUserId: userId, groupEmail, description });
        await group.addUser(user);
        
        res.json({ group });
    }));

    return router;
};