﻿using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.OData;
using BaseSPA.Core;
using BaseSPA.Core.Models;

namespace BaseSPA.Web.Controllers.OData
{
    public class PostsController : ODataController
    {
        private readonly Context _db;

	    public PostsController(ContextFactory contextFactory)
	    {
		    _db = contextFactory.GetContext<Context>();
	    }

		// GET: odata/Posts
		[EnableQuery]
        public IQueryable<Post> GetPosts()
        {
            return _db.Posts;
        }

        // GET: odata/Posts(5)
        [EnableQuery]
        public SingleResult<Post> GetPost([FromODataUri] Guid key)
        {
            return SingleResult.Create(_db.Posts.Where(post => post.Id == key));
        }

        // PUT: odata/Posts(5)
        public async Task<IHttpActionResult> Put(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var entity = await _db.Posts.FindAsync(post);
            if (entity == null)
            {
                return NotFound();
            }

	        entity.Title = post.Title;
	        entity.Content = post.Content;
			_db.Entry(entity).State = EntityState.Modified;
	        await _db.SaveChangesAsync();

            return Updated(post);
        }

        // POST: odata/Posts
        public async Task<IHttpActionResult> Post(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _db.Posts.Add(post);
	        await _db.SaveChangesAsync();

	        return Created(post);
        }

        // DELETE: odata/Posts(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
            Post post = await _db.Posts.FindAsync(key);
            if (post == null)
            {
                return NotFound();
            }

            _db.Posts.Remove(post);
            await _db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Posts(5)/Blog
        [EnableQuery]
        public SingleResult<Blog> GetBlog([FromODataUri] Guid key)
        {
            return SingleResult.Create(_db.Posts.Where(m => m.Id == key).Select(m => m.Blog));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}