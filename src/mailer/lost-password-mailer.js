module.exports = function(Q, nodemailer, emailTemplates, mailerConfig, templatesDirectory) {

  return {
    send: function(user, domain) {
      var deferred = Q.defer();
      emailTemplates(templatesDirectory, function(err, template) {
        if (err) {
          deferred.reject(err);
        }
        // Prepare nodemailer transport object
        var transport = nodemailer.createTransport(mailerConfig.transport);

        // Send a single email
        template('lost-password-email', {
          user: user,
          link: mailerConfig.lostPassword.lostPasswordLink
            .replace('{domain}', domain)
            .replace('{token}', user.activationCode)
        }, function(err, html) {
          if (err) {
          deferred.reject(err);
          } else {
            transport.sendMail({
              from: mailerConfig.lostPassword.from,
              to: user.email,
              subject: mailerConfig.lostPassword.subject,
              html: html,
              generateTextFromHTML: true
            }, function(err, responseStatus) {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(responseStatus);
              }
            });
          }
        });
      });

      return deferred.promise;
    }
  };
};
