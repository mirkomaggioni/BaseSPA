using System;
using System.Data.Entity;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using BaseSPA.Core;
using BaseSPA.Core.Models;

namespace BaseSPA.Web.Controllers.Api
{
    public class BlogsController : ApiController
    {
		// GET: api/Blogs
		[HttpGet]
		public async Task<IHttpActionResult> GetBlogs()
		{
			using (var db = ContextFactory.GetContext<Context>(readOnly: true))
			{
				return Ok(await db.Blogs.ToListAsync());
			}
		}

		// GET: api/Blogs/5
		[HttpGet]
        public async Task<IHttpActionResult> GetBlog(Guid id)
		{
	        using (var db = ContextFactory.GetContext<Context>(readOnly: true))
	        {
		        var blog = await db.Blogs.FindAsync(id);
		        if (blog == null)
		        {
			        return NotFound();
		        }

				return Ok(blog);
	        }
        }

        // PUT: api/Blogs/5
		[HttpPut]
        public async Task<IHttpActionResult> PutBlog([FromBody] Blog blog)
        {
	        using (var db = ContextFactory.GetContext<Context>())
	        {
		        var entity = await db.Blogs.FindAsync(blog.Id);
		        if (entity == null)
		        {
			        return NotFound();
		        }

		        entity.Url = blog.Url;
				db.Entry(entity).State = EntityState.Modified;
		        await db.SaveChangesAsync();

				return StatusCode(HttpStatusCode.OK);
			}
        }

        // POST: api/Blogs
		[HttpPost]
        public async Task<IHttpActionResult> PostBlog([FromBody] Blog blog)
        {
	        using (var db = ContextFactory.GetContext<Context>())
	        {
		        db.Blogs.Add(blog);
		        await db.SaveChangesAsync();

		        return StatusCode(HttpStatusCode.OK);
	        }
        }

        // DELETE: api/Blogs/5
		[HttpDelete]
        public async Task<IHttpActionResult> DeleteBlog(Guid id)
        {
	        using (var db = ContextFactory.GetContext<Context>())
	        {
				var entity = await db.Blogs.FindAsync(id);
		        if (entity == null)
		        {
			        return NotFound();
		        }

		        db.Blogs.Remove(entity);
				await db.SaveChangesAsync();

		        return StatusCode(HttpStatusCode.OK);
	        }
        }
    }
}