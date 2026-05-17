const prisma = require("../config/prisma")

class TaskController {

  async create(req, res) {
    try {
      const { originalText, listId } = req.body

      const task = await prisma.task.create({
        data: {
          originalText,
          listId,
        },
      })

      return res.status(201).json(task)
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  async index(req, res) {
    try {
      const { listId } = req.params

      const tasks = await prisma.task.findMany({
        where: {
          listId,
        },
        orderBy: {
          createdAt: "desc",
        },
      })

      return res.json(tasks)
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const { originalText } = req.body

      const task = await prisma.task.update({
        where: {
          id,
        },
        data: {
          originalText,
        },
      })

      return res.json(task)
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  async toggle(req, res) {
    try {
      const { id } = req.params

      const task = await prisma.task.findUnique({
        where: {
          id,
        },
      })

      const updatedTask = await prisma.task.update({
        where: {
          id,
        },
        data: {
          completed: !task.completed,
        },
      })

      return res.json(updatedTask)
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      await prisma.task.delete({
        where: {
          id,
        },
      })

      return res.json({
        message: "Task deleted",
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }
}

module.exports = new TaskController()