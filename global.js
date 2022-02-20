// global.back_end_url = "http://169.254.18.33:5000"
global.back_end_url = "https://limitless-fjord-04126.herokuapp.com"
global.image_host_url = "https://dream-real.s3.eu-west-3.amazonaws.com/"

let user_id = 0;

const set_userid = (id) => {
  user_id = id;
  console.log('user_id updated', user_id);
};

const manage_user_id = {
    set_userid,
    user_id
};

export default manage_user_id;