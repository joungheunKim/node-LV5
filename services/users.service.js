const UserRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const env = process.env;

// 하위 개층의 레파지토리 호출
class UserService {
  userRepository = new UserRepository();

  loginUser = async (nickname, password) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const findUser = await this.userRepository.findUser([{nickname:nickname}]);

    // throw 임의로 에러를 발생시키며, js 는 오류발생시 아래로직은 수행하지않음
    if (!findUser) 
      throw { code: 400, message: '해당하는 사용자가 존재하지 않습니다.' };
    
    if (findUser.password !== password) 
      throw { code: 400, message: '패스워드를 확인해주세요.' };
     
      const token = jwt.sign(
        {
          userId: findUser.userId,
          nickname: findUser.nickname
        },
        env.JWT_SECRET_KET
      );
      return {  code: 200, message: '로그인에 성공했습니다.', token };

  };

  createUser = async (nickname, password, confirmPassword) => {
    // 유효성 검사
    const nicknameRegExr = /[a-zA-z0-9].{3,15}$/;
    // ? 있을수도 없을 수도있다, * 여러개 가능
    const passwordRegExr =
      /^(?=.*[a-zA-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,30}$/;

    const findUser = await this.userRepository.findUser([{nickname:nickname}]);

    if (password === confirmPassword)
      throw { code: 400, message: '비밀번호가 일치하지 않습니다.' };

    if (findUser) throw { code: 400, message: '중복된 닉네임 입니다.' };
    
    if (!nicknameRegExr.test(nickname)) {
      throw {
        code: 400,
        message: '닉네임은 특수문자가 포함되지 않은 4~15자리여야합니다.',
      };
    }
   
    if (!passwordRegExr.test(password)) {
      throw {
        code: 400,
        message:
          '비밀번호는 영문자로 시작하여 영문자+숫자+특수문자 6~30자리여야합니다',
      };
    }
    await this.userRepository.createUser(nickname, password);
    return { code: 210, message: '회원가입 성공' };
  };
}

module.exports = UserService;
