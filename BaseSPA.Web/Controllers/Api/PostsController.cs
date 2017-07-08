using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using BaseSPA.Core;
using BaseSPA.Core.Models;

namespace BaseSPA.Web.Controllers.Api
{
    public class PostsController : ApiController
    {
		// GET: api/Posts
		[HttpGet]
		public async Task<IHttpActionResult> GetPosts()
		{
			using (var db = ContextFactory.GetContext<Context>(readOnly: true))
			{
				return Ok(await db.Posts.ToListAsync());
			}
		}

	    // GET: api/Posts
	    [HttpGet]
		[Route("api/posts/getblogposts/{blogId}")]
	    public async Task<IHttpActionResult> GetPosts(Guid blogId)
	    {
		    using (var db = ContextFactory.GetContext<Context>(readOnly: true))
		    {
			    return Ok(await db.Posts.Where(p => p.BlogId == blogId).ToListAsync());
		    }
	    }

	    // GET: api/Posts/5
		[HttpGet]
        public async Task<IHttpActionResult> GetPost(Guid id)
		{
	        using (var db = ContextFactory.GetContext<Context>(readOnly: true))
	        {
		        var post = await db.Posts.FindAsync(id);
		        if (post == null)
		        {
			        return NotFound();
		        }

				return Ok(post);
	        }
        }

        // PUT: api/Posts/5
		[HttpPut]
        public async Task<IHttpActionResult> PutPost([FromBody] Post post)
        {
	        using (var db = ContextFactory.GetContext<Context>())
	        {
		        var entity = await db.Posts.FindAsync(post.Id);
		        if (entity == null)
		        {
			        return NotFound();
		        }

		        entity.Title = post.Title;
		        entity.Content = post.Content;
				db.Entry(entity).State = EntityState.Modified;
		        await db.SaveChangesAsync();

				return StatusCode(HttpStatusCode.OK);
			}
        }

        // POST: api/Posts
		[HttpPost]
        public async Task<IHttpActionResult> PostPost([FromBody] Post post)
        {
	        using (var db = ContextFactory.GetContext<Context>())
	        {
		        db.Posts.Add(post);
		        await db.SaveChangesAsync();

		        return StatusCode(HttpStatusCode.OK);
	        }
        }

        // DELETE: api/Posts/5
		[HttpDelete]
        public async Task<IHttpActionResult> DeletePost(Guid id)
        {
	        using (var db = ContextFactory.GetContext<Context>())
	        {
				var entity = await db.Posts.FindAsync(id);
		        if (entity == null)
		        {
			        return NotFound();
		        }

		        db.Posts.Remove(entity);
				await db.SaveChangesAsync();

		        return StatusCode(HttpStatusCode.OK);
	        }
        }
    }
}