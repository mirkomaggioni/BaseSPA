using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaseSPA.Core.Models
{
	[Table("Blog")]
	public class Blog
	{
		[Key]
		public Guid Id { get; set; }
		public string Name { get; set; }
		public string Url { get; set; }

		public DateTime Created { get; set; } = DateTime.Now;

		[Column(TypeName = "date")]
		public DateTime Date { get; set; } = DateTime.Today;

		public virtual List<Post> Posts { get; set; }
	}
}
