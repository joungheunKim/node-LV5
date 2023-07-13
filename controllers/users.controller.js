const UserService = require('../services/users.service');

// User의 컨트롤러(Controller)역할을 하는 클래스
class UserController {
  // User 서비스 클래스를 컨트롤러 클래스의 멤버 변수로 할당
  userService = new UserService();

  loginUser = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      // 서비스 계층에 구현된 findAllUsers 로직을 실행합니다.
      const { code, message, token } = await this.userService.loginUser(nickname, password);

      res.cookie('Authorization', `Bearer ${token}`)
      return res.status(code).json(message)
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('알 수 없는 에러가 발생');
    }
  };

  createUser = async (req, res, next) => {
    try {
      const { nickname, password, confirmPassword } = req.body;
      // 서비스 계층에 구현된 findAllUsers 로직을 실행합니다.
      const { code, message } = await this.userService.createUser(
        nickname,
        password,
        confirmPassword
      );
      return res.status(code).json(message);
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.log(err);
      res.status(500).send('알 수 없는 에러 발생');
    }
  };
}
module.exports = UserController;
