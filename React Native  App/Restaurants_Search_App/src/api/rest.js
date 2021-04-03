import axios from 'axios';
axios.defaults.baseURL = 'https://api.yelp.com/v3/businesses';
axios.defaults.headers.common = {
  Authorization:
    'bearer xN5SpVp5A2lsn0tyECnB9ni-PYppYcWXGxQIml6nDIbi75v1XqFfay5vtlF-YMcIeFEGF46VjR4LWd4nlL-trYl4zW1g7MQ2xCP9sX-bVDXJZJOr_43ZK3q2l6FlYHYx',
};
export default axios;
