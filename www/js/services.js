var module = angular.module('decoupled_auth.services', []);

/**
 * Drupal.org factory to interact with the Drupal GET API.
 */
module.factory('DrupalOrg', function($http, $rootScope, $q, CacheService, config) {
  var commentStructure = {
    "comment_body":{
      "value":"<p>Here's a patch that updates <code>hook_party_primary_fields_alter()</code> to do that.</p>",
      "format":"1"
    },
    "field_attribute_contribution_to":[],
    "field_for_customer":[],
    "field_attribute_as_volunteer":[],
    "flag_drupalorg_comment_spam_user":[],
    "cid":"9734175",
    "name":"andrewbelcher",
    "homepage":"",
    "subject":"",
    "url":"https://www.drupal.org/node/2454873#comment-9734175",
    "edit_url":"https://www.drupal.org/comment/edit/9734175",
    "created":"1426695611",
    "node":{
      "uri":"https://www.drupal.org/api-d7/node/2454873",
      "id":"2454873",
      "resource":"node"
    },
    "author":{
      "uri":"https://www.drupal.org/api-d7/user/655282",
      "id":"655282",
      "resource":"user"
    }
  };

  var fileStructure = {
    "fid":"5440160",
    "name":"2636914-3.patch",
    "mime":"text/x-diff",
    "size":"7737",
    "url":"https://www.drupal.org/files/issues/2636914-3.patch",
    "timestamp":"1450372501",
    "owner":{
      "uri":"https://www.drupal.org/api-d7/user/1837556",
      "id":"1837556",
      "resource":"user"
    }
  };

  var issueStructure = {
    "taxonomy_vocabulary_9":[],
    "body": {
      "value":"<p>At its core, a CRM is about relationships: relationships between pieces of data which themselves hold data.</p>",
      "summary":"",
      "format":"1"
    },
    "field_issue_status":"1",
    "field_issue_priority":"200",
    "field_issue_category":"3",
    "field_issue_component":"Ecosystem modules",
    "field_project":{
      "uri":"https://www.drupal.org/api-d7/node/1260650",
      "id":"1260650",
      "resource":"node"
    },
    "field_issue_files":[
      {
        "file": {
          "uri":"https://www.drupal.org/api-d7/file/5439832",
          "id":"5439832",
          "resource":"file"
        },
        "display":"1"
      },
      {
        "file":{
          "uri":"https://www.drupal.org/api-d7/file/5440700",
          "id":"5440700",
          "resource":"file"
        },
        "display":"1"
      }
    ],
    "field_issue_related":[],
    "field_issue_version":"7.x-1.x-dev",
    "field_issue_credit":[
      {
        "uri":"https://www.drupal.org/api-d7/comment/10678388",
        "id":"10678388",
        "resource":"comment"
      },
      {
        "uri":"https://www.drupal.org/api-d7/comment/10678390",
        "id":"10678390",
        "resource":"comment"
      }
    ],
    "flag_drupalorg_node_spam_user":[],
    "flag_project_issue_follow_user":[
      {
        "uri":"https://www.drupal.org/api-d7/user/794682",
        "id":794682,
        "resource":"user"
      },
      {
        "uri":"https://www.drupal.org/api-d7/user/1072564",
        "id":1072564,
        "resource":"user"
      }
    ],
    "nid":"1260782",
    "vid":"5405567",
    "is_new":false,
    "type":"project_issue",
    "title":"Integrate with Relation to store Party Relationships (e.g Father->Son)",
    "language":"und",
    "url":"https://www.drupal.org/node/1260782",
    "edit_url":"https://www.drupal.org/node/1260782/edit",
    "status":"1",
    "promote":"0",
    "sticky":"0",
    "created":"1314357038",
    "changed":"1344581757",
    "author": {
      "uri":"https://www.drupal.org/api-d7/user/107701",
      "id":"107701",
      "resource":"user"
    },
    "book_ancestors":[],
    "comment":"2",
    "comments":[
      {
        "uri":"https://www.drupal.org/api-d7/comment/4910860",
        "id":4910860,
        "resource":"comment"
      },
      {
        "uri":"https://www.drupal.org/api-d7/comment/4910870",
        "id":4910870,
        "resource":"comment"
      }
    ],
    "comment_count":"6",
    "comment_count_new":false,
    "flag_flag_tracker_follow_user":[],
    "has_new_content":null,
    "last_comment_timestamp":1344581757000
  };

  var projectStructure = {
    "taxonomy_vocabulary_44":{
      "uri":"https://www.drupal.org/api-d7/taxonomy_term/9990",
      "id":"9990",
      "resource":"taxonomy_term"
    },
    "taxonomy_vocabulary_46":{
      "uri":"https://www.drupal.org/api-d7/taxonomy_term/9988",
      "id":"9988",
      "resource":"taxonomy_term"
    },
    "taxonomy_vocabulary_3":[
      {
        "uri":"https://www.drupal.org/api-d7/taxonomy_term/14",
        "id":"14",
        "resource":"taxonomy_term"
      },
      {
        "uri":"https://www.drupal.org/api-d7/taxonomy_term/56",
        "id":"56",
        "resource":"taxonomy_term"
      }
    ],
    "body":{
      "value":"<p>This module defines an entity that represents.</p>",
      "summary":"",
      "format":"1"
    },
    "upload":[],
    "field_project_type":"full",
    "field_project_machine_name":"party",
    "field_project_has_issue_queue":true,
    "field_project_components": [
      "Code",
      "Party hats",
      "Party profile",
      "Party user",
      "User interface",
      "Documentation",
      "Ecosystem modules",
      "Miscellaneous"
    ],
    "field_project_default_component":null,
    "field_project_issue_guidelines":[],
    "field_project_has_releases":true,
    "field_release_version_format":null,
    "field_project_homepage":{"url":""},
    "field_project_changelog":{"url":""},
    "field_project_demo":{"url":"http://thetribesonline.co.uk/party/"},
    "field_project_documentation":{"url":"http://drupal.org/node/1600330"},
    "field_project_screenshots":{"url":""},
    "field_project_license":{"url":""},
    "field_project_images":[
      {
        "file":{
          "uri":"https://www.drupal.org/api-d7/file/4122518",
          "id":"4122518",
          "resource":"file"
        },
        "alt":"Groucho and Chico."
      }
    ],
    "field_supporting_organizations":[],
    "field_download_count":"1721",
    "field_project_phpcs_errors":null,
    "field_project_phpcs_full":"<h2> This was run on 07-20-2015 09:18:07</h2>\n",
    "field_project_phpcs_ts":"1437383707",
    "field_project_phpcs_warnings":null,
    "flag_drupalorg_node_spam_user":[],
    "nid":"1260650",
    "vid":"2671882",
    "is_new":false,
    "type":"project_module",
    "title":"Party",
    "language":"und",
    "url":"https://www.drupal.org/project/party",
    "edit_url":"https://www.drupal.org/node/1260650/edit",
    "status":"1",
    "promote":"0",
    "sticky":"0",
    "created":"1314351666",
    "changed":"1417493092",
    "author":{
      "uri":"https://www.drupal.org/api-d7/user/107701",
      "id":"107701",
      "resource":"user"
    },
    "book_ancestors":[],
    "comment":"0",
    "comments":[],
    "comment_count":0,
    "comment_count_new":false,
    "flag_flag_tracker_follow_user":[],
    "has_new_content":null,
    "last_comment_timestamp":"1314351666"
  };

  return {
    /**
     * Triggers getter callback to cache Drupal.org projects.
     */
    cacheAllProjects: function () {
      for (var i = 0; i < config.projectIds.length; i++) {
        this.getProject(config.projectIds[i]);
      }
    },

    /**
     * Triggers getter callback to cache Drupal.org issues.
     *
     * @param projectId
     */
    cacheAllProjectIssues: function (projectId) {
      this.getProjectIssues(projectId);
    },

    /**
     * Triggers getter callback to cache comments on Drupal.org issues.
     *
     * @param issueId
     */
    cacheAllIssueComments: function (issueId) {
      this.getIssueComments(issueId);
    },

    /**
     * Fetches a cached Drupal.org resource.
     *
     * @param uri
     * @returns {*}
     */
    getURI: function (uri) {
      return $http.get(uri).then(function (resp) {
        return resp.data;
      }, function (err) {
        console.error('ERR', err);
      });
    },

    /**
     * Fetches a cached Drupal.org project node.
     *
     * @param projectId
     * @returns {*}
     */
    getProject: function (projectId) {
      var project = CacheService.getVar('project_' + projectId);

      if (!project) {
        return $http.get('https://www.drupal.org/api-d7/node/' + projectId + '.json').then(function (resp) {
          resp.data.last_comment_timestamp = resp.data.last_comment_timestamp * 1000;
          resp.data.created = resp.data.created * 1000;
          resp.data.changed = resp.data.changed * 1000;
          CacheService.setVar('project_' + projectId, resp.data);
          return resp.data;
        }, function (err) {
          console.error('ERR', err);
        });
      }

      return project;
    },

    /**
     * Fetches a cached Drupal.org issue node.
     *
     * @param issueId
     * @returns {*}
     */
    getIssue: function (issueId) {
      var issue = CacheService.getVar('issue_' + issueId);

      if (!issue) {
        return $http.get('https://www.drupal.org/api-d7/node/' + issueId + '.json').then(function (resp) {
          resp.data.last_comment_timestamp = resp.data.last_comment_timestamp * 1000;
          resp.data.created = resp.data.created * 1000;
          resp.data.changed = resp.data.changed * 1000;
          CacheService.setVar('issue_' + issueId, resp.data);
          return resp.data;
        }, function (err) {
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
    getProjectIssues: function (projectId) {
      var projectIssues = CacheService.getVar('project_issues_' + projectId);

      if (!projectIssues) {
        return $http.get('https://www.drupal.org/api-d7/node.json?type=project_issue&field_project=' + projectId).then(function (resp) {
          CacheService.setVar('project_issues_' + projectId, resp.data);
          return resp.data;
        }, function (err) {
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
    getUser: function (userId) {
      var user = CacheService.getVar('user_' + userId);

      if (!user) {
        return $http.get('https://www.drupal.org/api-d7/user/' + userId + '.json').then(function (resp) {
          CacheService.setVar('user_' + userId, resp.data);
          return resp.data;
        }, function (err) {
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
    getComment: function (commentId) {
      var comment = CacheService.getVar('comment_' + commentId);

      if (!comment) {
        return $http.get('https://www.drupal.org/api-d7/comment/' + commentId + '.json', {getUser: this.getUser}).then(function (resp) {

          // Cache the user
          //var user = CacheService.getVar('user_' + resp.data.author.id);
          //if (!user) {
          //  resp.config.getUser(resp.data.author.id);
          //}

          resp.data.created = resp.data.created * 1000;
          CacheService.setVar('comment_' + commentId, resp.data);
          return resp.data;
        }, function (err) {
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
    getIssueComments: function (issueId) {
      var issueComments = CacheService.getVar('issue_comments_' + issueId);

      if (!issueComments) {
        var issue = this.getIssue(issueId);
        return $q.when(issue).then(function (data) {
          var commentIds = [];

          for (var i = 0; i < data.comments.length; i++) {
            commentIds.push(data.comments[i].id);
          }

          CacheService.setVar('issue_comments_' + issueId, commentIds);
          return commentIds;
        });
      }

      return issueComments;
    },

    /**
     * Fetches a cached Drupal.org file entity.
     *
     * @param fileId
     * @returns {*}
     */
    getFile: function (fileId) {
      var file = CacheService.getVar('file_' + fileId);

      if (!file) {
        return $http.get('https://www.drupal.org/api-d7/file/' + fileId + '.json').then(function (resp) {
          resp.data.timestamp = resp.data.timestamp * 1000;
          CacheService.setVar('file_' + fileId, resp.data);
          return resp.data;
        }, function (err) {
          console.error('ERR', err);
        });
      }

      return file;
    },

    /**
     * Fetches a cached list of Drupal.org file ids.
     *
     * @param issueId
     * @returns Array
     *   Array of file ids.
     */
    getIssueFiles: function (issueId) {
      var issueFiles = CacheService.getVar('issue_files_' + issueId);

      if (!issueFiles) {
        var issue = this.getIssue(issueId);

        return $q.when(issue).then(function (data) {
          var fileIds = [];

          for (var i = 0; i < data.field_issue_files.length; i++) {
            fileIds.push(data.field_issue_files[i].file.id);
          }

          CacheService.setVar('issue_files_' + issueId, fileIds);
          return fileIds;
        });
      }

      return issueFiles;
    },

    /**
     * TODO Clear caches action.
     * @param startsWith
     * @constructor
     */
    ClearSomeLocalStorage: function (startsWith) {
      var myLength = startsWith.length;

      Object.keys(localStorage).forEach(function (key) {
        if (key.substring(0, myLength) == startsWith) {
          localStorage.removeItem(key);
        }
      });
    }
  }
});

/**
 * Favourites factory to store and recall favourite issues.
 */
module.factory('Favourites', function(CacheService) {
  var Favourites = CacheService.getVar('favourites');

  if (!Favourites) {
    Favourites = {};
  }

  return {
    /**
     * Get an array of favourite issue ids.
     * @returns {Array}
     */
    getAll: function () {
      var ids = [];
      for (var id in Favourites) {
        if (Favourites.hasOwnProperty(id)) {
          ids.push(id);
        }
      }
      return ids;
    },

    /**
     * Add and store a new issue in favourites.
     * @param id
     */
    add: function (id) {
      Favourites[id] = id;
      CacheService.setVar('favourites', Favourites);
    },

    /**
     * Remove and store an issue from favourites.
     * @param id
     */
    remove: function (id) {
      delete Favourites[id];
      CacheService.setVar('favourites', Favourites);
    }
  }
});

/**
 * Drupal fields factory to convert field values and labels.
 */
module.factory('DrupalFields', function() {

  var statuses = {
    1: 'Active',
    13: 'Needs work',
    8: 'Needs review',
    14: 'Reviewed & tested by the community',
    15: 'Patch (to be ported)',
    2: 'Fixed',
    4: 'Postponed',
    16: 'Postponed (maintainer needs more info)',
    3: 'Closed (duplicate)',
    5: 'Closed (won\'t fix)',
    6: 'Closed (works as designed)',
    18: 'Closed (cannot reproduce)',
    7: 'Closed (fixed)'
  };

  return {
    /**
     * Get human readable name for status term.
     */
    getStatus: function (statusId) {
      return statuses[statusId];
    }
  }
});