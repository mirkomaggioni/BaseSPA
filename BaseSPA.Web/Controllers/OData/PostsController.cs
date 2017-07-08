using System;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using BaseSPA.Core.Models;

namespace BaseSPA.Web.Controllers.OData
{
    public class PostsController : ODataController
    {
        private Context db = new Context();

        // GET: odata/Posts
        [EnableQuery]
        public IQueryable<Post> GetPosts()
        {
            return db.Posts;
        }

        // GET: odata/Posts(5)
        [EnableQuery]
        public SingleResult<Post> GetPost([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.Posts.Where(post => post.Id == key));
        }

        // PUT: odata/Posts(5)
        public async Task<IHttpActionResult> Put([FromODataUri] Guid key, Delta<Post> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Post post = await db.Posts.FindAsync(key);
            if (post == null)
            {
                return NotFound();
            }

            patch.Put(post);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(post);
        }

        // POST: odata/Posts
        public async Task<IHttpActionResult> Post(Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Posts.Add(post);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PostExists(post.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(post);
        }

        // PATCH: odata/Posts(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] Guid key, Delta<Post> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Post post = await db.Posts.FindAsync(key);
            if (post == null)
            {
                return NotFound();
            }

            patch.Patch(post);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(post);
        }

        // DELETE: odata/Posts(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
            Post post = await db.Posts.FindAsync(key);
            if (post == null)
            {
                return NotFound();
            }

            db.Posts.Remove(post);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Posts(5)/Blog
        [EnableQuery]
        public SingleResult<Blog> GetBlog([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.Posts.Where(m => m.Id == key).Select(m => m.Blog));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PostExists(Guid key)
        {
            return db.Posts.Count(e => e.Id == key) > 0;
        }
    }
}
