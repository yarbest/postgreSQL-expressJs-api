import { RequestHandler } from "express";
import dbPool from "../db/dbPool";
import { catchAndHandleErrors } from "../utils/catchAndHandleErrors";

const CREATE_POST_QUERY = 'INSERT INTO "post" (title, content, person_id) VALUES ($1, $2, $3) RETURNING *'
const GET_POSTS_BY_USER_QUERY = 'SELECT * FROM post WHERE person_id = $1'
const GET_ALL_POSTS = 'SELECT * FROM post'

class PostController {
  createPost: RequestHandler = async (req, res) => {
    catchAndHandleErrors(res, async () => {
      const {title, content, person_id} = req.body
      const post = await dbPool.query(CREATE_POST_QUERY, [title, content, person_id])
      res.status(201).json(post.rows[0])
    })
  }

  getPostsByUser: RequestHandler = async (req, res) => {
    catchAndHandleErrors(res, async () => {
      const {person_id} = req.query
      if(person_id && person_id.length !== 0) {
        const post = await dbPool.query(GET_POSTS_BY_USER_QUERY, [person_id])
        res.json(post.rows[0])
      } else {
        const post = await dbPool.query(GET_ALL_POSTS, [])
        res.json(post.rows)
      }
    })
  }
}

export default new PostController();