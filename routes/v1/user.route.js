const express = require("express");
const usersControllers = require("../../controllers/users.controller");

const router = express.Router();

router
  .route('/random')
  /**
 * @api {get} /user/random a random user
 * @apiDescription Get a random user
 * @apiPermission anyone
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiSuccess [{Object}] all the users.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
  .get(usersControllers.getRandomUser);

router
  .route("/all")
  /**
   * @api {get} /user/all All users
   * @apiDescription Get all the users
   * @apiPermission anyone
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess [{Object}] all the users.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(usersControllers.getAllUsers);

router
  .route("/save")
  /**
   * @api {get} /user/save save a user
   * @apiDescription save a user
   * @apiPermission anyone
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess [{Object}] save a user in a array of object.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(usersControllers.saveAUser);

router
  .route("/update/:id")
  /**
 * @api {get} /user/update/id update a user
 * @apiDescription update a user
 * @apiPermission anyone
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiSuccess [{Object}] save a user in a array of object.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
  .patch(usersControllers.updateUser);

router
  .route("/bulk-update")
  /**
 * @api {get} /user/bulk-update update all users
 * @apiDescription update all users
 * @apiPermission anyone
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiSuccess [{Object}] save a user in a array of object.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
  .patch(usersControllers.updateUsers);

router
  .route("/delete/:id")
  /**
 * @api {get} /user/delete/id delete a user
 * @apiDescription delete a user
 * @apiPermission anyone
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiSuccess [{Object}] save a user in a array of object.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
  .delete(usersControllers.deleteUser);

module.exports = router;