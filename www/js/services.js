var module = angular.module('decoupled_auth.services', []);

module.factory('DrupalOrg', function($http, CacheService, config) {
  return {
    /**
     * Triggers getter callback to cache Drupal.org projects.
     */
    cacheAllProjects: function() {
      for (var i = 0; i < config.projectIds.length; i++) {
        this.getProject(config.projectIds[i]);
      }
    },

    /**
     * Triggers getter callback to cache Drupal.org issues.
     *
     * @param projectId
     */
    cacheAllProjectIssues: function(projectId) {
      this.getProjectIssues(projectId);
    },

    /**
     * Triggers getter callback to cache comments on Drupal.org issues.
     *
     * @param issueId
     */
    cacheAllIssueComments: function(issueId) {
      this.getIssueComments(issueId);
    },

    /**
     * Fetches a cached Drupal.org project node.
     *
     * @param projectId
     * @returns {*}
     */
    getProject: function(projectId) {
      var project = CacheService.getVar('project_'+projectId);

      if (!project) {
        $http.get('https://www.drupal.org/api-d7/node/'+projectId+'.json').then(function(resp) {
          CacheService.setVar('project_'+projectId, resp.data);
        }, function(err) {
          console.error('ERR', err);
        });

        project = {id: projectId, reload: true};
      }

      return project;
    },

    /**
     * Fetches a cached Drupal.org issue node.
     *
     * @param issueId
     * @returns {*}
     */
    getIssue: function(issueId) {
      var issue = CacheService.getVar('issue_'+issueId);

      if (!issue) {
        $http.get('https://www.drupal.org/api-d7/node/'+issueId+'.json').then(function(resp) {
          CacheService.setVar('issue_'+issueId, resp.data);
        }, function(err) {
          console.error('ERR', err);
        });
      }

      return issue;
    },

    /**
     * Fetches a cached list of Drupal.org issue node ids.
     *
     * @param projectId
     * @returns Array
     *   Array of node ids.
     */
    getProjectIssues: function(projectId) {
      var projectIssues = CacheService.getVar('project_issues_'+projectId);

      if (!projectIssues) {
        $http.get('https://www.drupal.org/api-d7/node.json?type=project_issue&field_project='+projectId, {getIssue: this.getIssue}).then(function(resp) {

          var issueIds = [];

          for (var i = 0; i < resp.data.list.length; i++) {
            // Trigger issue getter to store cache.
            resp.config.getIssue(resp.data.list[i].nid);
            issueIds.push(resp.data.list[i].nid);
          }
          CacheService.setVar('project_issues_'+projectId, issueIds);
        }, function(err) {
          console.error('ERR', err);
        });

      }

      return projectIssues;
    },

    /**
     * Fetches a cached Drupal.org user entity.
     *
     * @param userId
     * @returns {*}
     */
    getUser: function(userId) {
      var user = CacheService.getVar('user_'+userId);

      if (!user) {
        $http.get('https://www.drupal.org/api-d7/user/'+userId+'.json').then(function(resp) {
          CacheService.setVar('user_'+userId, resp.data);
        }, function(err) {
          console.error('ERR', err);
        });
      }

      return user;
    },

    /**
     * Fetches a cached Drupal.org comment entity.
     *
     * @param commentId
     * @returns {*}
     */
    getComment: function(commentId) {
      var comment = CacheService.getVar('comment_'+commentId);

      if (!comment) {
        $http.get('https://www.drupal.org/api-d7/comment/'+commentId+'.json', {getUser: this.getUser}).then(function(resp) {

          // Cache the user
          var user = CacheService.getVar('user_'+resp.data.author.id);

          if (!user) {
            resp.config.getUser(resp.data.author.id);
          }

          CacheService.setVar('comment_'+commentId, resp.data);
        }, function(err) {
          console.error('ERR', err);
        });
      }

      return comment;
    },

    /**
     * Fetches a cached list of Drupal.org comment ids.
     *
     * @param issueId
     * @returns Array
     *   Array of comment ids.
     */
    getIssueComments: function(issueId) {
      var issueComments = CacheService.getVar('issue_comments_'+issueId);

      if (!issueComments) {
        var issue = this.getIssue(issueId);

        var commentIds = [];

        for (var i = 0; i < issue.comments.length; i++) {
          // Trigger comment getter to store cache.
          this.getComment(issue.comments[i].id);
          commentIds.push(issue.comments[i].id);
        }
        CacheService.setVar('issue_comments_'+issueId, commentIds);
      }

      return issueComments;
    }
  };
});
