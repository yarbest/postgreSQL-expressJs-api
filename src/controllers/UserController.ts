import { RequestHandler } from "express";
import dbPool from "../db/dbPool";
import { catchAndHandleErrors } from '../utils/catchAndHandleErrors'

const CREATE_USER_QUERY = 'INSERT INTO person (name, surname) VALUES ($1, $2) RETURNING *'
const GET_USERS_QUERY = 'SELECT * FROM person'
const GET_ONE_USER_QUERY = 'SELECT * FROM person where id = $1'
const UPDATE_USER_QUERY = 'UPDATE person SET name = $1, surname = $2 where id = $3 RETURNING *'
const DELETE_USER_QUERY = 'DELETE FROM person where id = $1'

class UserController {
  createUser: RequestHandler = async (req, res) => {
    catchAndHandleErrors(res, async () => {
      const {name, surname} = req.body
      const newUser = await dbPool.query(CREATE_USER_QUERY, [name, surname])
      res.status(201).json(newUser.rows[0])
    })
  }

  getUsers: RequestHandler = async (req, res) => {
    catchAndHandleErrors(res, async () => {
      const users = await dbPool.query(GET_USERS_QUERY)
      res.json(users.rows)
    })
  }

  getOneUser: RequestHandler = async (req, res) => {
    catchAndHandleErrors(res, async () => {
      const person = await dbPool.query(GET_ONE_USER_QUERY, [req.params.id])
      res.json(person.rows[0])
    })
  }

  updateUser: RequestHandler = async (req, res) => {
    catchAndHandleErrors(res, async () => {
      const {id, name, surname} = req.body
      const updatedPerson = await dbPool.query(UPDATE_USER_QUERY, [name, surname, id])
      res.json(updatedPerson.rows[0])
    })
  }

  deleteUser: RequestHandler = async (req, res) => {
    catchAndHandleErrors(res, async () => {
      await dbPool.query(DELETE_USER_QUERY, [req.params.id])
      res.json({message: 'User was deleted'})
    })
  }
}

export default new UserController();