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
        [ResponseType(typeof(Blog))]
        public IHttpActionResult GetBlog(Guid id)
		{
	        using (var db = ContextFactory.GetContext<Context>(readOnly: true))
	        {
		        var blog = db.Blogs.Find(id);
		        if (blog == null)
		        {
			        return NotFound();
		        }

				return Ok(blog);
	        }
        }

        // PUT: api/Blogs/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBlog(Guid id, Blog blog)
        {
	        using (var db = ContextFactory.GetContext<Context>())
	        {
		        var entity = db.Blogs.Find(id);
		        if (entity == null)
		        {
			        return NotFound();
		        }

		        entity.Url = blog.Url;
		        await db.SaveChangesAsync();

				return StatusCode(HttpStatusCode.OK);
			}
        }

        // POST: api/Blogs
        [ResponseType(typeof(Blog))]
        public async Task<IHttpActionResult> PostBlog(Blog blog)
        {
	        using (var db = ContextFactory.GetContext<Context>())
	        {
		        db.Blogs.Add(blog);
		        await db.SaveChangesAsync();

		        return StatusCode(HttpStatusCode.OK);
	        }
        }

        // DELETE: api/Blogs/5
        [ResponseType(typeof(Blog))]
        public async Task<IHttpActionResult> DeleteBlog(Guid id)
        {
	        using (var db = ContextFactory.GetContext<Context>())
	        {
				var entity = db.Blogs.Find(id);
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