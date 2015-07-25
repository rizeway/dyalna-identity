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
        template('confirmation-email', {
          user: user,
          link: mailerConfig.activation.activationLink
            .replace('{domain}', domain)
            .replace('{token}', user.activationCode)
        }, function(err, html) {
          if (err) {
          deferred.reject(err);
          } else {
            transport.sendMail({
              from: mailerConfig.activation.from,
              to: user.email,
              subject: mailerConfig.activation.subject,
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
