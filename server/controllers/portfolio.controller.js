const AWS = require("aws-sdk");
const config = require("../../config/config");
const { sendRedirect } = require("../utils/sendRedirect");
const {
  updatePortfolio,
  getPortfolio
} = require("../services/portfolio.services");
require("dotenv").config();

async function GetTwitterTimeline() {
  const endpoint = process.env.TWITTER_API;
  const method = "GET";
  const contentType = "application/json";
  try {
    const response = await sendRedirect(endpoint, method, contentType);
    if (response) {
      return response.data;
    }
  } catch (customAxiosError) {
    Logger.info(`Error getting whitelist`);
  }
}

async function getData(req, res) {
  AWS.config.update(config.aws_remote_config);

  var table = "portfolio";
  var portfolio = 1;
  var params = {
    TableName: table,
    Key: {
      idportfolio: portfolio
    }
  };

  const data = await getPortfolio(params);
  const twitterRes = await GetTwitterTimeline();
  res.locals = {
    name2: "Portfolio-user",
    title2: "Manual",
    name: data.names,
    description: data.description,
    phone: data.phone,
    email: data.email,
    lastname: data.lastname,
    experience: data.experience,
    imageUrl: data.image_url,
    experienceSum: data.experience_summary,
    job: data.curr_job,
    twitter: data.twitter_url,
    instagram: data.instagram_url,
    linkedin: data.linkedin_url,
    tweets: twitterRes.data
  };
  res.render("portfolio");
}

async function updateData(req, res) {
  const {
    nameval,
    lastname,
    description,
    job,
    phone,
    email,
    experienceSum,
    experience,
    twitter,
    instagram,
    linkedin,
    imageurl
  } = req.body;
  AWS.config.update(config.aws_remote_config);
  var table = "portfolio";
  var portfolio = 1;
  var params = {
    TableName: table,
    Key: {
      idportfolio: portfolio
    },
    UpdateExpression:
      "set #namevar =:nameval,description = :description,lastname = :lastname ,phone = :phone,email = :email,curr_job = :job, experience = :experience, experience_summary= :experienceSum, instagram_url=:instagram,linkedin_url=:linkedin,twitter_url=:twitter, image_url = :imageurl ",
    ExpressionAttributeNames: {
      "#namevar": "names"
    },
    ExpressionAttributeValues: {
      ":description": description,
      ":nameval": nameval,
      ":lastname": lastname,
      ":phone": phone,
      ":email": email,
      ":job": job,
      ":experience": experience,
      ":experienceSum": experienceSum,
      ":instagram": instagram,
      ":linkedin": linkedin,
      ":twitter": twitter,
      ":imageurl": imageurl
    }
  };

  await updatePortfolio(params);

  var table = "portfolio";
  var portfolio = 1;
  var params = {
    TableName: table,
    Key: {
      idportfolio: portfolio
    }
  };
  const updatedData = await getPortfolio(params);
  const twitterRes = await GetTwitterTimeline();
  res.locals = {
    name2: "Portfolio-user",
    title2: "Manual",
    name: updatedData.names,
    description: updatedData.description,
    phone: updatedData.phone,
    email: updatedData.email,
    title: updatedData.tittle,
    lastname: updatedData.lastname,
    experience: updatedData.experience,
    imageUrl: updatedData.image_url,
    experienceSum: updatedData.experience_summary,
    job: updatedData.curr_job,
    twitter: updatedData.twitter_url,
    instagram: updatedData.instagram_url,
    linkedin: updatedData.linkedin_url,
    tweets: twitterRes.data
  };
  res.render("portfolio");

  return;
}

module.exports = { getData, updateData };
