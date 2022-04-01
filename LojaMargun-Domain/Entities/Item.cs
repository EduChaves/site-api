﻿namespace LojaMargun_Domain.Entities
{
    public class Item : EntityBase
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Length { get; set; }
        public string Image { get; set; }
        public double Value { get; set; }
    }
}
