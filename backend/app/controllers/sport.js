const SportModel = require('../models/sport.js')
/**
 * Sport
 * @class
 */
class Sport {
  constructor (app, connect) {
    this.app = app
    this.SportModel = connect.model('Sport', SportModel)

    this.create_sport()
    this.show_sport()
    this.search_sport()
    this.delete_sport()
    this.update_sport()
  }

  /**
   * Show an sport
   * @Endpoint : /v1/sport/{id}
   * @Method : GET
   */
  show_sport () {
    this.app.get('/v1/sport/:id', (req, res) => {
      try {
        this.SportModel.findById(req.params.id).then(sport => {
          res.status(200).json(sport || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: "Internal Server Error"
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        })
      }
    })
  }

  /**
   * Delete an sport
   * @Endpoint : /v1/sport/{id}/delete
   * @Method : DELETE
   */
  delete_sport () {
    this.app.delete('/v1/sport/:id/delete', (req, res) => {
      try {
        this.SportModel.findByIdAndRemove(req.params.id).then(sport => {
          res.status(200).json({
              code: 200,
              message: "Sport succesfully deleted"
            }
          )
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: "Internal Server Error"
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        })
      }
    })
  }

  /**
   * Update an sport
   * @Endpoint : /v1/sport/{id}/update
   * @Method : PUT
   */
  update_sport () {
    this.app.put('/v1/sport/:id/update', (req, res) => {
      try {
        this.SportModel.findByIdAndUpdate(req.params.id, req.body).then(sport => {
          res.status(200).json(sport || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: "Internal Server Error"
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        })
      }
    })
  }

  /**
   * Create an sport
   * @Endpoint : /v1/sport/create
   * @Method : POST
   */
  create_sport () {
    this.app.post('/v1/sport/create', (req, res) => {
      try {
        const sportModel = this.SportModel(req.body)
        
        sportModel.save().then(sport => {
          res.status(200).json(sport || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: "Internal Server Error"
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: 'error : ' + err
        })
      }
    })
  }

/**
   * Show all the sports
   * @Endpoint : /v1/sport/search
   * @Method : GET
   */
  search_sport () {
    this.app.get('/v1/sport/search', (req, res) => {
      try {
        this.SportModel.find({}).then(sport => {
          res.status(200).json(sport || {})
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: "Internal Server Error"
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: "Internal Server Error"
        })
      }
    })
  }
}

module.exports = Sport
