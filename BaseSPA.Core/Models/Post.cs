using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaseSPA.Core.Models
{
	[Table("Post")]
	public class Post
	{
		[Key]
		public Guid Id { get; set; }
		public string Title { get; set; }
		public string Content { get; set; }
		public Guid BlogId { get; set; }
		[ForeignKey("BlogId")]
		public virtual Blog Blog { get; set; }
	}
}
