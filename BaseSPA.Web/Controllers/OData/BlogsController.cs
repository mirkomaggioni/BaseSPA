using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.OData;
using BaseSPA.Core;
using BaseSPA.Core.Models;

namespace BaseSPA.Web.Controllers.OData
{
	public class BlogsController : ODataController
    {
	    private readonly SpaContext _db;

	    public BlogsController(ContextFactory contextFactory)
	    {
		    _db = contextFactory.GetContext<SpaContext>();
		}

		// GET: odata/Blogs
		[EnableQuery]
        public IQueryable<Blog> GetBlogs()
        {
	        return _db.Blogs;
		}

		// GET: odata/Blogs(5)
		[EnableQuery]
        public SingleResult<Blog> GetBlog(Guid key)
        {
			return SingleResult.Create(_db.Blogs.Where(b => b.Id == key));
		}

		// PATCH: odata/Blogs1(5)
		[AcceptVerbs("PATCH", "MERGE")]
	    public async Task<IHttpActionResult> Patch(Guid key, Delta<Blog> patch)
	    {
		    Validate(patch.GetInstance());

		    if (!ModelState.IsValid)
		    {
			    return BadRequest(ModelState);
		    }

		    var blog = await _db.Blogs.FindAsync(key);
			if (blog == null)
		    {
			    return NotFound();
		    }

		    patch.Patch(blog);
			_db.Entry(blog).State = EntityState.Modified;

		    await _db.SaveChangesAsync();

		    return Updated(blog);
	    }

		// POST: odata/Blogs
		public async Task<IHttpActionResult> Post(Blog blog)
        {
			blog.Id = Guid.NewGuid();

	        if (!ModelState.IsValid)
	        {
		        return BadRequest(ModelState);
	        }

			_db.Blogs.Add(blog);
	        await _db.SaveChangesAsync();

	        return Created(blog);
		}

        // DELETE: odata/Blogs(5)
        public async Task<IHttpActionResult> Delete(Guid key)
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
