
module.exports = {
  local_storage_key: "node-react-aws-dynamodb",
  aws_user_table_name: "usersTab",
  aws_local_config: {
    region: "local",
    endpoint: "http://localhost:8000"
  },
  aws_remote_config: {
    accessKeyId: "",
    secretAccessKey: "",
    region: ""
  },
};

