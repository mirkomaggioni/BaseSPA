using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.OData;
using BaseSPA.Core;
using BaseSPA.Core.Models;

namespace BaseSPA.Web.Controllers.OData
{
    public class BlogsController : ODataController
    {
	    private readonly Context _db = ContextFactory.GetContext<Context>();

		// GET: odata/Blogs
		[EnableQuery]
        public IQueryable<Blog> GetBlogs()
        {
	        return _db.Blogs;
		}

		// GET: odata/Blogs(5)
		[EnableQuery]
        public SingleResult<Blog> GetBlog([FromODataUri] Guid key)
        {
			return SingleResult.Create(_db.Blogs.Where(b => b.Id == key));
		}

        // PUT: odata/Blogs(5)
        public async Task<IHttpActionResult> Put(Blog blog)
        {
	        if (!ModelState.IsValid)
	        {
		        return BadRequest(ModelState);
	        }

			var entity = await _db.Blogs.FindAsync(blog.Id);
	        if (entity == null)
	        {
		        return NotFound();
	        }

	        entity.Url = blog.Url;
	        _db.Entry(entity).State = EntityState.Modified;
	        await _db.SaveChangesAsync();

	        return Updated(entity);
		}

        // POST: odata/Blogs
        public async Task<IHttpActionResult> Post(Blog blog)
        {
	        if (!ModelState.IsValid)
	        {
		        return BadRequest(ModelState);
	        }

			_db.Blogs.Add(blog);
	        await _db.SaveChangesAsync();

	        return Created(blog);
		}

        // DELETE: odata/Blogs(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
	        var entity = await _db.Blogs.FindAsync(key);
	        if (entity == null)
	        {
		        return NotFound();
	        }

	        _db.Blogs.Remove(entity);
	        await _db.SaveChangesAsync();

	        return StatusCode(HttpStatusCode.OK);
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
