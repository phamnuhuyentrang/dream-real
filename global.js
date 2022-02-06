global.back_end_url = "http://192.168.1.25:5000"
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