using System;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;
using BaseSPA.Core.Models;

namespace BaseSPA.Web.Controllers.Api
{
	[Route("api/blogs")]
	public class ApiBlogsController : ApiController
	{
		public async Task<IHttpActionResult> Get()
		{
			using (var db = new SpaContext())
			{
				return Ok(await db.Blogs.ToListAsync());
			}
		}

		[Route("api/blogs/{id}")]
		public async Task<IHttpActionResult> Get(Guid id)
		{
			using (var db = new SpaContext())
			{
				var blog = await db.Blogs
					.FirstOrDefaultAsync(e => e.Id == id);
				if (blog == null)
					return NotFound();
				return Ok(blog);
			}
		}

		public async Task<IHttpActionResult> Post(Blog blog)
		{
			using (var db = new SpaContext())
			{
				db.Blogs.Add(blog);
				await db.SaveChangesAsync();
				return Ok(blog);
			}
		}

		public async Task<IHttpActionResult> Delete(Guid id)
		{
			using (var db = new SpaContext())
			{
				var blog = await db.Blogs
					.FirstOrDefaultAsync(e => e.Id == id);
				if (blog == null)
					return NotFound();
				db.Blogs.Remove(blog);
				await db.SaveChangesAsync();
				return Ok();
			}
		}

		public async Task<IHttpActionResult> Put(Guid id, Blog blog)
		{
			if (id != blog.Id)
				return BadRequest();
			using (var db = new SpaContext())
			{
				db.Configuration.ProxyCreationEnabled = false;
				db.Entry(blog).State = EntityState.Modified;
				await db.SaveChangesAsync();
				return Ok(blog);
			}
		}

	}
}
