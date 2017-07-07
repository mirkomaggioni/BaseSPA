using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaseSPA.Core.Models
{
	[Table("Blog")]
	public class Blog
	{
		public Guid Id { get; set; }
		public string Url { get; set; }
		public virtual List<Post> Posts { get; set; }
	}
}
