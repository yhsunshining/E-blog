var mongo = require('./db');
var markdown = require('markdown').markdown;

function Post(post) {
	this.author = post.author;
	this.author_id = post.author_id;
	this.title = post.title;
	this.content = post.content;
}
module.exports = Post;

Post.prototype.save = function(callback) {
	var post = {
		title: this.title,
		author: this.author,
		author_id: this.author_id,
		time: new Date().getTime(),
		content: this.content
	}

	mongo.open(function(err, db) {
		if (err) {
			return callback(err);
		}

		db.collection('post', function(err, collection) {
			if (err) {
				mongo.close();
				return callback(err);
			}
			collection.insert(post, {
				safe: true
			}, function(error, post) {
				mongo.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
};

Post.get = function(query, callback) {
	if (Object.prototype.toString.call(query) !== "[object Object]") {
		return callback(null);
	}

	mongo.open(function(err, db) {
		if (err) {
			callback(err);
		}

		mongo.collection('post', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.find(query).sort({
				time: -1
			}).toArray(function(err, docs) {
				mongo.close();
				if (err) {
					return callback(err);
				}
				
				docs.forEach(function(doc) {
					doc.content = markdown.toHTML(doc.content);
				});
				
				callback(null, docs);
			});
		});
	});
}